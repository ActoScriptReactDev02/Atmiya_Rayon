import { FlatList, Linking, PermissionsAndroid, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RNButton, RNContainer, RNImage, RNStyles, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import FetchMethod from '../../api/FetchMethod'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Colors, FontFamily, FontSize, height, hp, normalize, width, wp } from '../../theme'
import { Images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import Geolocation from 'react-native-geolocation-service'
import { NavRoutes } from '../../navigation'


const TripDetails = ({route}) => {
 const CustomerId = route.params.CustomerId
 const [data,setdata] = useState([])
 const [isloding, setisloding] = useState(false)
  const [selectTrip, setselectTrip] = useState(null);
 const navigation = useNavigation();
  const watchId = useRef(null);
  const hasNavigated = useRef(false);
  console.log('route.params',route.params.IsQrScan);
  

  useEffect(() => {
    GetCustomerOrderDetails();  

    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  // start tracking when selectTrip changes
  useEffect(() => {
    if (selectTrip) {
      startTracking();
    }
  }, [selectTrip]);

   const requestLocationPermission = async () => {
  
      if (Platform.OS === "android") {
  
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
            title: "Location Permission",
            message: "App needs location access",
            buttonPositive: "OK",
          }
        )
  
        return granted === PermissionsAndroid.RESULTS.GRANTED
      }
  
      return true
    }

  // distance formula
  const getDistanceInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const toRad = deg => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // get destination from selected order
  const getCurrentDestination = () => {
    if (selectTrip?.location?.latitude && selectTrip?.location?.longitude) {
      return {
        latitude: parseFloat(selectTrip?.location?.latitude),
        longitude: parseFloat(selectTrip?.location?.longitude)
      };
    }
    return null;
  };

  // start location tracking
  const startTracking = async () => {
     const granted = await requestLocationPermission()
      if (!granted) {
        console.log("Permission denied");
    return;
  }
    hasNavigated.current = false;
    watchId.current = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;

        const destination = getCurrentDestination();
        if (!destination) return;

        const distance = getDistanceInMeters(
          latitude,
          longitude,
          destination.latitude,
          destination.longitude
        );

       // console.log('Distance:', distance);

        if (distance < 50 && !hasNavigated.current) {
          hasNavigated.current = true;
          console.log('Reached destination ✅');

          // stop tracking
          if (watchId.current !== null) {
            Geolocation.clearWatch(watchId.current);
          }
          handlenavigate()
        }
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 5000,
        fastestInterval: 2000
      }
    );
  };

  // open Google Map navigation
  const openMap = () => {
    const destination = getCurrentDestination();
    console.log('destination',destination);
    if (!destination) return;

    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}&travelmode=driving`;
     console.log('url',url);

    Linking.openURL(url);
  };

  const handlenavigate = () =>{
    if(route.params.IsQrScan){
        navigation.navigate(NavRoutes.SCAN)} 
    else{
        navigation.navigate(NavRoutes.SCANORDER,{Data:data, CustomerId:CustomerId})
      }
  }

  // API call
  const GetCustomerOrderDetails = async () => {
    
    try {
      setisloding(true);

      const response = await FetchMethod.GET({
        EndPoint: `TripMaster/GetCustomerOrderDetails?CustomerId=${CustomerId}`
      });
console.log('response',response);

      if (response.length > 0) {
        setdata(response);
        const firstPending = response.find(
          item => item.IsDelivered === false
        );
         
        if (firstPending) {
          setselectTrip(firstPending);
        }
      } else {
        setdata([]);
      }

      setisloding(false);
    } catch (error) {
      setisloding(false);
      console.log('GetCustomerOrderDetails Error -->', error);
    }
  };

  return (
    <RNContainer isLoading={isloding} style={{paddingHorizontal:wp(0)}}>
      <View style={{paddingHorizontal:wp(4)}}>
        <RNHeader title={'Order'}/>
        </View>
        <View style={{height:hp(40)}}>
     <MapView
  showsUserLocation={true}
  style={{ flex: 1 }}
  initialRegion={{
    latitude: parseFloat(data[0]?.location?.latitude) || 21.22539,
    longitude: parseFloat(data[0]?.location?.longitude) || 72.8068,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }}
>
  {data.map((loc, index) => {
    const lat = parseFloat(loc.location?.latitude);
    const lng = parseFloat(loc.location?.longitude);

    // Skip invalid coordinates
    if (!lat || !lng) return null;

    return (
      <Marker
        key={loc.OrderUniqueId || index}
        coordinate={{
          latitude: lat,
          longitude: lng,
        }}
      >
        <View style={{ alignItems: "center" }}>
          
          {/* Label */}
          <View style={styles.labelstyle}>
            <Text style={{ fontSize: 12, fontWeight: "600" }}>
              {`${index + 1}. ${loc.location?.name}`}
            </Text>
          </View>

          {/* Icon */}
          <RNImage
            tintColor={Colors.Orange}
            style={{ height: wp(8), width: wp(8) }}
            source={Images.loaction}
          />
        </View>
      </Marker>
    );
  })}
</MapView>
      
      </View>
      <FlatList contentContainerStyle={styles.contentcontainersyle} data={data} renderItem={({item,index}) => (
        <View style={[styles.mainwrapstyle,{opacity: item.IsDelivered ? 0.6 :1,borderColor: item.IsDelivered ? Colors.Green : Colors.Orange}]}>
            <View style={{paddingBottom:hp(1)}}>
              <RNText size={FontSize.font13} family={FontFamily.SemiBold}  children={item.OrderCode}/>
            <View style={{position:'absolute', right:wp(2)}}>
             {item.IsDelivered ?  <RNText family={FontFamily.SemiBold} color={item.IsDelivered ? Colors.Green :Colors.Orange} 
              children={item.IsDelivered ? 'Delivered' :'Pending⏳'}/> :
              <Pressable hitSlop={20} onPress={() => handlenavigate()}>
                <RNImage tintColor={Colors.Orange} style={{height:wp(5.5), width:wp(5.5)}} source={Images.scanner}/>
              </Pressable>}
              </View>
            </View>
         <View style={styles.detailswrapstyle}>
              <RNImage tintColor={Colors.Orange}  style={styles.iconestyle} source={Images.date}/>
              <RNText  style={styles.valuetextstyle} children={item.OrderDate}/>
          </View>
          <View style={styles.detailswrapstyle}>
               <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.loaction}/>
                <RNText numOfLines={2}  style={styles.valuetextstyle} children={item.Address + ', '+ item.Landmark + ', '+item.City+ ', '+ item.Pincode}/>
          </View>
          <View style={styles.detailswrapstyle}>
              <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.cityicone}/>
               <RNText numOfLines={3}  style={styles.valuetextstyle} children={item.City+ ', '+ item.Pincode}/>
          </View>
        </View>
      )}
      ListEmptyComponent={() =>(
        <View style={{...RNStyles.flexCenter, paddingTop:hp(10)}}>
          <RNText children={'No Data Found'} family={FontFamily.SemiBold} size={FontSize.font15}/>
        </View>
      )}
      />
     {selectTrip != null &&  <RNButton onPress={() => openMap()} btnstyles={{marginTop:hp(1), alignSelf:'center'}} title={'Start trip'}/>}
    </RNContainer>
  )
}

export default TripDetails

const styles = StyleSheet.create({
  labelstyle:{
      backgroundColor: "white",
      paddingHorizontal: wp(2),
      paddingVertical: hp(0.5),
      borderRadius: normalize(6),
      marginBottom: hp(1),
      elevation: 3
  },
  contentcontainersyle :{
    paddingTop:hp(2), 
    paddingHorizontal:wp(2), 
    rowGap:hp(1.8)
  },
  mainwrapstyle:{
    backgroundColor:Colors.White,
    borderRadius: normalize(6),
    paddingHorizontal:wp(2),
    paddingVertical:hp(0.5),
    borderWidth:normalize(1)
  },
  detailswrapstyle:{
  flexDirection: 'row',
  alignItems: 'flex-start',
  columnGap:wp(1.5),
  paddingVertical:hp(0.2)
    },
     valuetextstyle:{
      flex:1,
      //color:Colors.Black,
      fontFamily:FontFamily.Medium,
      fontSize:FontSize.font13
    },
     iconestyle:{
      height:wp(4),
      width:wp(4),
    },
})