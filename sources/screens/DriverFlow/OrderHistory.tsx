import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { RNContainer, RNImage, RNStyles, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import FetchMethod from '../../api/FetchMethod'
import { OrderItemView } from '../../components/DriverFlow'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'
import { Colors, FontFamily, FontSize, height, hp, normalize, width, wp } from '../../theme'
import { Images } from '../../constants'
import LottieView from 'lottie-react-native'
import moment from 'moment'

const OrderHistory = () => {
  const [data, setdata] = useState([])
  const [isloading, setisloading] = useState(false)
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false);

  // useFocusEffect(useCallback(() => {
  //   GetTripDetails()
  // },[]))

useEffect(() => {
 GetTripDetails()
},[])

  const GetTripDetails = async () => {
    try{
      setisloading(true)
     const response = await FetchMethod.GET({
      EndPoint:`TripMaster/GetTripDetails`
     })
     
     if(response.length > 0){
      setdata(response)
     }else{
      setdata([])
     }
      setisloading(false)
    }catch(error){
      setdata([])
      setisloading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await GetTripDetails(); 
    } catch (e) {
      //console.log(e);
    }
    setRefreshing(false);
  };

  return (
   <RNContainer >
    <RNHeader onLeftPress={() => navigation.navigate(NavRoutes.DRIVERPROFILE)} backarrowshow={true} title={'Order History'}/>
    <View style={{flex:1}}>
      <FlatList
       keyExtractor={(item, index) => index.toString()}
        initialNumToRender={10}       // first load only 5 items
       maxToRenderPerBatch={10}      // render batch size
         windowSize={5}               // control buffer
         removeClippedSubviews={true}
       refreshing={refreshing}           
       onRefresh={onRefresh} 
       refreshControl={
       <RefreshControl
         refreshing={refreshing}      
         onRefresh={onRefresh}         
         colors={[Colors.Orange]}           
         tintColor={Colors.Orange}           
       />}
       contentContainerStyle={{rowGap:hp(2), flexGrow:1}} data={data} 
      renderItem={({item,index}) => {
           const barWidth = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
        return (
       <Pressable 
       onPress={() => navigation.navigate(NavRoutes.TRIPDETAILS,{TripId:item.TripId, IsQrScan:item.IsQrScan, EndedTrip:item.EndTrip, TripStart:item.TripStart})}
       //onPress={() => navigation.navigate(NavRoutes.DRIVERORDERDETAILS,{TripId:item.TripId,IsQrScan:item.IsQrScan})} 
       style={styles.crad}>
        <View style={styles.detailswrapstyle}>
             <RNText style={styles.valuetextstyle} numOfLines={1}  children={item.TripCode}/>
            <View style={{ ...RNStyles.flexRow,columnGap:wp(2),}} >
             <RNImage   style={styles.iconestyle} source={Images.box}/>
             <RNText family={FontFamily.Medium}  size={FontSize.font13}  children={item.TotalOrders}/>
           </View>
        </View>
            <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange}  style={styles.iconestyle} source={Images.date}/>
             <RNText  style={styles.valuetextstyle} children={item.CreatedDate}/>
           </View>

           <View style={[styles.detailswrapstyle,{paddingVertical:hp(0)}]}>
             <RNImage   style={styles.iconestyle} source={item.OrderStatus == 'Pending' ? Images.errorIcone :Images.doneicone}/>
             <RNText color={item.OrderStatus == 'Pending' ? Colors.Red : Colors.Green} size={FontSize.font12} family={FontFamily.Medium}  style={styles.valuetextstyle} children={item.OrderStatus}/>
           </View>
            

          {(item.EndedTrip || item.TripStart) && (item.EndedTrip ? 
          <View>
          <View style={{...RNStyles.flexRow, paddingTop:hp(1), paddingBottom:hp(1)}}>
            <RNImage source={Images.successicone} tintColor={Colors.Orange} style={styles.iconestyle}/>
              <View style={{height:hp(0.2), backgroundColor: Colors.Orange, flex:1}}/>
            <RNImage source={Images.successicone} tintColor={Colors.Orange} style={styles.iconestyle}/>
          </View>
          <View style={{...RNStyles.flexRowBetween}}>
            <RNText children={item.StartTime != null ? moment(item.StartTime).format("DD MMM h:mm A") : ''} align={'center'} style={styles.timetextstyle()} />
            <RNText children={item.DurationText} align={'center'} style={styles.timetextstyle(Colors.Green)}   />
            <RNText children={item.EndTime !=  null ? moment(item.EndTime).format("DD MMM h:mm A") : ''} align={'center'} style={styles.timetextstyle()}  />
          </View>
          </View>
           : 
           <View>
           <View style={{...RNStyles.flexRow, paddingTop:hp(2)}}>
            <RNImage source={Images.successicone} tintColor={Colors.Orange} style={styles.iconestyle}/>
            <View style={{height:hp(0.2), backgroundColor: Colors.Orange + 40, flex:1}}>
              <View style={{width: item.TripStart ? `${barWidth}%` : '0%',backgroundColor: Colors.Orange, flex:1}}/>
              <View style={{position:'absolute', top:hp(-2.8), zIndex:9999, left:`${barWidth-2}%`}}>
                <LottieView autoPlay loop source={require('../../assets/Lottie/track.json')} style={{height:wp(7), width:wp(7)}}/>
                {/* <RNImage tintColor={Colors.Orange} source={Images.DeliveryPending} style={{height:wp(6), width:wp(6)}}/> */}
              </View>
            </View>
            <View style={styles.roundestyle}/>
          </View>
          <RNText pTop={hp(0.5)} children={moment(item.StartTime).format("DD MMM h:mm A")} style={styles.timetextstyle()}  />
          </View>)}
          
            
       </Pressable>
      )}}
       ListEmptyComponent={() => ( !isloading && 
        <View style={{...RNStyles.flexCenter}}>
          <LottieView autoPlay loop  style={{height:wp(60),width:wp(60)}} source={require('../../assets/Lottie/NotFound.json')}/>
          <RNText color={Colors.Orange} family={FontFamily.Medium} children={'No orders found'}/>
        </View> 
      )}
      />
    </View>
   </RNContainer>
  )
}

export default OrderHistory

const styles = StyleSheet.create({
  crad:{
   backgroundColor:Colors.White,
   paddingVertical:hp(1.4),
   paddingHorizontal:wp(2.8),
   borderRadius:normalize(8),
  },
     detailswrapstyle:{
      ...RNStyles.flexRow,
      columnGap:wp(2),
      paddingVertical:hp(0.4)
    },
    labelstyle:{
        color:Colors.Grey,
        fontSize:FontSize.font14,
        width:wp(22)
    },
     valuetextstyle:{
      flex:1
    },
      iconestyle:{
      height:wp(4),
      width:wp(4),
    },
    roundestyle:{
      height:wp(3.5),
      width:wp(3.5),
      borderRadius:normalize(100),
      backgroundColor: Colors.Orange
    },
    timetextstyle: (tcolor) => ({
      color:tcolor ? tcolor :Colors.Orange,
      fontSize:FontSize.font11,
      fontFamily:FontFamily.Medium
    })
})