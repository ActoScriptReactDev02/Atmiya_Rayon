import { ActivityIndicator, Modal, PermissionsAndroid, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { RNButton, RNImage, RNInput, RnlabelInput, RNStyles, RNText, RnToast } from '../../common'
import RNHeader from '../../common/RNHeader'
import { Colors, FontFamily, FontSize, height, hp, normalize, width, wp } from '../../theme'
import { Images } from '../../constants'
import { KeyboardAvoidingView, KeyboardAwareScrollView, KeyboardGestureArea, KeyboardStickyView } from 'react-native-keyboard-controller'
import FetchMethod from '../../api/FetchMethod'
import { useSelector } from 'react-redux'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LottieView from 'lottie-react-native'
import Geolocation from 'react-native-geolocation-service';


const CreateAddressModal = ({visible,onRequestClose,onclose,Editdata}) => {
   const [isnavigate, setisnavigate] = useState(false)
   const [isLoading, setisLoading] = useState(false)
   const  {AsyncValue} = useSelector(state => state.Auth);
   const [areaCodeData, setareaCodeData] = useState([]);
   const [arealoading, setarealoading] = useState(false);
   const [isShow, setisShow] = useState(false)
   const [loaLoading, setloaLoading] = useState(false)
   const [showtoast,Setshowtoast] = useState({
     isShow:false,
     message:'',
     Sucess:false,
     Title:''
   })
   const [myloaction,setmyloaction] = useState(false)
    const [state, setstate] = useState({
        address:'',
        city:'',
        landmark:'',
        pincode:'',
        defult:false,
        loactionData:{
          description:'',
          lat:'',
          lng:''
        },
       area:{
         areaCodeId:0,
          areaname:''
       }
    })
const addresserror = isnavigate && state.address.trim().length < 5;
const cityerror = isnavigate && state.city.trim().length < 2;
const landmarerror = isnavigate && state.landmark.trim().length < 2;
const pincodeerror = isnavigate && !/^\d{6}$/.test(state.pincode);
const loactionerror = isnavigate && state.loactionData.description == ""
const areaerror = isnavigate && state.area.areaCodeId == 0

const isValid =
  state.address.trim().length >= 5 &&
  state.city.trim().length >= 2 &&
  state.landmark.trim().length >= 2 &&
  /^\d{6}$/.test(state.pincode)&&
  state.loactionData.description.length > 1&&
  state.area.areaCodeId !=0;


 
  useEffect(() => {
   GetAreaCodeApi()
    if(Editdata !=null && Object.keys(Editdata).length > 0){
  setstate(p => ({
            ...p,
            address:Editdata.Address, 
            city: Editdata.City, 
            defult: Editdata.IsDefault, 
            landmark: Editdata.Landmark,
            pincode:Editdata.Pincode,
            loactionData:{
              description:Editdata.Location,
              lat:Editdata.Latitude,
              lng:Editdata.Longitude
            },
            area:{
              areaCodeId:Editdata.AreaCodeId,
              areaname:Editdata.AreaCodename
            }
        }))
    }else{
        setstate(p => ({
            ...p,
            address:'', city:'', defult:false, landmark:'',pincode:'', loactionData:{description:'',lat:'',lng:''}, area:{areaCodeId:0, areaname:''}
        }))
    }
  },[Editdata])

    const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );0
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getLocation = async (loactionflag) => {
  setloaLoading(true)
  if (!loactionflag) {
    setmyloaction(loactionflag)
    setstate(p => ({
      ...p,
      address: '',
      city: '',
      defult: false,
      landmark: '',
      pincode: '',
      loactionData: { description: '', lat: '', lng: '' },
      area: { areaCodeId: 0, areaname: '' }
    }));
    setloaLoading(false);
  } else {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setmyloaction(false)
      return;
    } 
     setmyloaction(loactionflag)
    Geolocation.getCurrentPosition(
      async (pos) => {
        const coords = pos.coords;
        const result = await getAddress(coords.latitude, coords.longitude);
        if (result) {
          const parsed = extractAddress(result);
          setstate(p => ({
            ...p,
            city: parsed.city || '',
            landmark: parsed.landmark || '',
            pincode: parsed.pincode || '',
            loactionData: {
              description: parsed.fullAddress || '',
              lat: coords.latitude || '',
              lng: coords.longitude || '',
            }
          }));
          //console.log("Parsed Address:", parsed);
        }
        setloaLoading(false);
      },
      (error) => {
        console.log(error);
        setloaLoading(false);
        setmyloaction(false)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
};

  const getAddress = async (lat, lon) => {
    //console.log('lat, lon',lat, lon);
    
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCOBWtVtISFYRKyw3lhBNctKUnCpY6VEJ8`
  );
  const data = await response.json();
  console.log('data',data);
  
  if (data.results.length > 0) {
    console.log(data.results[0].formatted_address);
    //return data.results[0].formatted_address;
    return data.results[0];
  }
  return null;
};
const extractAddress = (result) => {
  const comp = result.address_components;

  const get = (type) =>
    comp.find(c => c.types.includes(type))?.long_name || '';

  return {
    city: get('locality'),
    area: get('sublocality') || get('sublocality_level_1'),
    landmark: get('premise') || get('point_of_interest'),
    pincode: get('postal_code'),
    fullAddress: result.formatted_address,
  };
};
   
const handletoast = (data) => {
   Setshowtoast({
           isShow: true,
           Sucess: data.Sucess,
           Title: data.Title,
           message: data.message,
         });
         setTimeout(() => {
           Setshowtoast({
             isShow: false,
             Sucess: '',
             Title: '',
             message: '',
           });
     }, 2000);
  }

const AddUserAddress = async() => {
    setisnavigate(true);
    if (isValid) {
    try{
        setisLoading(true)
        const response = await FetchMethod.POST({
            EndPoint:`UserMaster/AddUserAddress`,
            Params:{
             "CustomerId": AsyncValue.CustomerId,
             "Address": state.address,
             "City": state.city,
             "IsDefault": state.defult,
             "Landmark": state.landmark,
             "Pincode": state.pincode,
             "Location": state.loactionData.description,
             "Latitude": state.loactionData.lat.toString(),
             "Longitude": state.loactionData.lng.toString(),
             "AreaCodeId":state.area.areaCodeId
           }
        })
        if(response?.success){
     handletoast({
      message:response.message,
        Sucess:true,
         Title:'Success'
     })
     onclose()
        }else{
    handletoast({
      message:response.message,
        Sucess:false,
         Title:'Success'
     })
        }
        setisLoading(false)
    }catch(error){
        setisLoading(false)
        //console.log('AddUserAddress error --->', error);
        
    }}
}

const updateaddress = async() =>{
    setisnavigate(true)
    if(isValid){
      try{
        setisLoading(true)
        const response = await FetchMethod.PUT({
            EndPoint:`UserMaster/UpdateUserAddress`,
            Params:{
              "Id": Editdata.Id,
              "CustomerId": AsyncValue.CustomerId,
              "Address": state.address,
              "City": state.city,
              "IsDefault": state.defult,
              "Landmark": state.landmark,
              "Pincode": state.pincode,
              "Location": state.loactionData.description,
              "Latitude": state.loactionData.lat.toString(),
              "Longitude": state.loactionData.lng.toString(),
              "AreaCodeId":state.area.areaCodeId
      }
        })
        console.log('AddUpdateAddress response',response);
        if(response?.success){
     handletoast({
      message:response.message,
        Sucess:true,
         Title:'Success'
     })
     onclose()
    }else{
    handletoast({
      message:response.message,
        Sucess:false,
         Title:'Success'
     })
        }
        setisLoading(false)
      }catch(error){
         setisLoading(false)
        //console.log('updateaddress error -->', error);
        
      }
    }
}

const GetAreaCodeApi = async () => {
  try{
    setarealoading(true)
    const response =  await FetchMethod.GET({
      EndPoint:`UserMaster/GetAreaCode`
    })
    if(response.ResponseCode == 0){
      if(response.Data.length > 0){
        setareaCodeData(response.Data);
         setarealoading(false);
      }else{
         setareaCodeData([])
        setarealoading(false)
      }
     
    }else{
      setareaCodeData([])
    }
      setarealoading(false)
  }catch(error){
     setareaCodeData([])
     setarealoading(false)
    //console.log('GetAreaCode api error --->', error);
    
  }
}
 

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} statusBarTranslucent={true} style={{zIndex:999}}>
        <View style={styles.modalcontiner}>
            <RNHeader onLeftPress={onRequestClose} title={'Add New Address'}  />
             <KeyboardAwareScrollView 
             keyboardShouldPersistTaps="handled"   
            nestedScrollEnabled={true} 
            style={{flex:1}}
            >
            <View style={{marginBottom:hp(1.5), paddingTop:hp(1)}}>
              <View style={styles.labelwrapstyle}>
                <RNText style={styles.labelstyle} children={'Loaction (Google)'}/>
                 <RNText color={Colors.Red} children={'*'}/>
              </View>
              
             <View style={{opacity:Editdata !=null && Object.keys(Editdata).length > 0 ? 1 :myloaction ? 0.5 : 1}} 
             pointerEvents={Editdata !=null && Object.keys(Editdata).length > 0 ? 'auto' :myloaction ? 'none' : 'auto'}>
               <GooglePlacesAutocomplete 
              debounce={200}
              enablePoweredByContainer={false}
              keyboardShouldPersistTaps="handled"
              fetchDetails={true}
                  styles={{
                          container: {
                            marginBottom: hp(1),
                            flex: 0,
                             zIndex: 9999, 
                          },
                          textInput: {...styles.googletextinput,},
                          listView: { ...styles.googlelistview, },
                          poweredContainer: { display: 'none', },
                        }}
                keepResultsAfterBlur={false}
                textInputProps={{
                  placeholderTextColor: Colors.Grey, // 👈 change color here
                   value: state.loactionData.description,
                  onChangeText: (text) => setstate(p => ({...p, loactionData:{description:text}})),
                 }}
                    placeholder='Type to search Location...'
                    onPress={(data, details = null) => {
                      // console.log('CLICK WORKING');
                      //  const selectedLocation = {
                      //     address: data.description,
                      //     lat: details?.geometry?.location?.lat,
                      //     lng: details?.geometry?.location?.lng,
                      //   };
                      //   console.log('selectedLocation',selectedLocation);
                        
                        setstate(p => ({...p, loactionData:{
                          description:data.description, 
                          lat: details?.geometry?.location?.lat,
                          lng: details?.geometry?.location?.lng
                        } }));      
                      }}
                     query={{
                       key: 'AIzaSyCOBWtVtISFYRKyw3lhBNctKUnCpY6VEJ8',
                       language: 'en',
                      components: 'country:in', 
                     }}
                   />
             </View>
                 {loactionerror &&  <RNText size={FontSize.font9} color={Colors.Red} children={'Please enter a valid loaction'}/>}
                {Editdata !=null && Object.keys(Editdata).length > 0 ? <View/> :<Pressable disabled={loaLoading} style={styles.loactionbtnwrapstyle} onPress={() => getLocation(!myloaction)}>
                  <RNImage tintColor={Colors.Orange} source={Images.loaction} style={{height:wp(4), width:wp(4)}}/>
                  <RNText  pTop={hp(0.2)} size={FontSize.font12} children={ (myloaction && !loaLoading) ? 'Choose Different Location' :'Use Current Location'}/>
                  { loaLoading && <ActivityIndicator size={'small'} color={Colors.Orange}/>}
                </Pressable>}
              </View>. 
              <RNText children={myloaction? 'true':'false'}/>
           
          <KeyboardAvoidingView>
            <View style={{  flex:1}}>
              
                <RnlabelInput 
                labeltitle={'Address'} 
                placeholder={'Enter Address'}
                error={addresserror}
                errormessage={'Please enter a valid address.'}
                value={state.address}
               onChangeText={v => setstate(p => ({...p, address:v}))}
                />
                <RnlabelInput 
                labeltitle={'City'} 
                placeholder={'Enter City'}
                error={cityerror}
                errormessage={'Please enter a valid city.'}
                value={state.city}
                onChangeText={v => setstate(p => ({...p, city:v}))}
                />
                <View>
                <View style={styles.labelwrapstyle}>
                <RNText style={styles.labelstyle} children={'Area Code'}/>
                 <RNText color={Colors.Red} children={'*'}/>
                </View>
                <View style={{marginBottom:hp(2.5)}}>
                   <TouchableOpacity onPress={() => setisShow(true)} style={styles.addressinputstyle}>
                    <RNText numOfLines={1} style={{flex:1}} children={state.area.areaname == '' ? 'Select Area Code' :state.area.areaname }/>
                    <RNImage source={Images.downArrow} style={styles.iconestyle}/>
                   </TouchableOpacity>
                    {areaerror &&  <RNText pTop={hp(0.5)} size={FontSize.font9} color={Colors.Red} children={'Please select area code'}/>}
                  {isShow && <View style={styles.addressconinerstyle}>
                    {arealoading ?
                    <View style={{...RNStyles.flexCenter}}>
                      <ActivityIndicator size={'large'} color={Colors.Orange}/>
                    </View>
                     : areaCodeData.length <= 0 ?
                     <View style={{...RNStyles.flexCenter}}>
                      <LottieView source={require('../../assets/Lottie/NotFound.json')} style={{height:wp(30), width:wp(30)}}/>
                      <RNText children={'No data found'} color={Colors.Orange}/>
                    </View>
                      :
                     <ScrollView keyboardShouldPersistTaps="handled" bounces={false} showsVerticalScrollIndicator={false}>
                      {areaCodeData.map((item, index) => {
                         const isLast = index === areaCodeData.length - 1;
                       return (
                        <TouchableOpacity key={index} onPress={() => {
                          setisShow(false);
                          setstate(p => ({...p, area:{areaCodeId:item.Id,areaname:item.Area}}))
                        }}  style={[styles.liststyle,{borderBottomWidth:isLast ? 0 :normalize(1),}]}>
                          <RNText color={state.area.areaCodeId == item.Id ? Colors.Orange : Colors.Black} numOfLines={1} style={styles.listtextstyle} children={item.Area}/>
                        </TouchableOpacity>
                       )
                     })}
                     </ScrollView>}
                   </View>}
                </View>
              </View>

                <RnlabelInput 
                labeltitle={'Landmark'} 
                placeholder={'Enter Landmark'}
                error={landmarerror}
                errormessage={'Please enter a valid landmark.'}
                value={state.landmark}
                onChangeText={v => setstate(p => ({...p, landmark:v}))}
                />
                <RnlabelInput 
                labeltitle={'Pincode'} 
                placeholder={'Enter Pincode'}
                maxLength={6}
                error={pincodeerror}
                errormessage={'Please enter a valid pincode.'}
                value={state.pincode}
                onChangeText={v => setstate(p => ({...p, pincode:v}))}
                keyboardType={'number-pad'}
                />
                <Pressable onPress={() => setstate(p =>({...p, defult:!state.defult}))} style={{...RNStyles.flexRow, columnGap:wp(2)}}>
                  { state.defult ?   <RNImage tintColor={Colors.Orange} source={Images.successicone} style={styles.iconestyle}/>
                    : <View style={styles.checkstyle}/>}
                    <RNText pTop={hp(0.2)} children={'Set as Default'}/>
                </Pressable>
            </View>
            </KeyboardAvoidingView>
            </KeyboardAwareScrollView>
            <RNButton disabled={isLoading} onPress={() => Editdata !=null && Object.keys(Editdata).length > 0 ? updateaddress() :AddUserAddress()} title={'Save Address'} isloding={isLoading}/>
        </View>
         {showtoast.isShow && <RnToast  toastcontinerstyle={{ top:hp(4)}}  Message={showtoast.message} isSuccess={showtoast.Sucess} Title={showtoast.Title}  />}
    </Modal>
  )
}   

export default CreateAddressModal

const styles = StyleSheet.create({
    modalcontiner:{
        paddingVertical:hp(5),
        paddingHorizontal:wp(4),
        flex:1
    },
  
    checkstyle:{
        height:wp(5.5),
        width:wp(5.5),
        borderWidth:1,
        borderRadius:normalize(10),
        borderColor:Colors.Orange
    },
    iconestyle:{
        height:wp(5.5),
        width:wp(5.5),
    },
    labelstyle:{
      fontFamily:FontFamily.Medium
    },
    labelwrapstyle:{
      ...RNStyles.flexRow, columnGap:wp(2), paddingBottom:hp(0.5)
    },
    addressinputstyle:{
      height:hp(5),
      borderWidth:normalize(1),
      borderRadius:normalize(5),
      justifyContent:'center',
      paddingHorizontal:wp(2.5),
      borderColor:Colors.BorderColor,
      flexDirection:'row',
      alignItems:'center',
      columnGap:wp(2)
    },
    addressconinerstyle:{
      backgroundColor:Colors.White,
      paddingHorizontal:wp(5),
      paddingVertical:hp(0.5),
      borderWidth:normalize(1),
      borderColor:Colors.BorderColor,
      borderRadius:normalize(8),
      maxHeight:hp(25),
      position:'absolute',
      zIndex:2,
      right:wp(0),
      left:wp(0),
      top:hp(6),
       elevation: 3, // Android shadow
       shadowColor: '#000', // iOS shadow
       shadowOpacity: 0.1,
       shadowRadius: 5,
    },
    liststyle:{
      // borderBottomWidth:normalize(1),
      borderColor:Colors.BorderColor,
      paddingVertical:hp(0.8)
    },
    listtextstyle:{
       flex:1,
    },
    googletextinput:{
      height:hp(5),
      borderWidth:normalize(1),
      borderColor:Colors.BorderColor,
      borderRadius:normalize(5),
      color:Colors.Black
    },
    googlelistview:{
      backgroundColor:Colors.White,
      borderRadius: normalize(5),
      borderWidth: normalize(1),
      borderColor: Colors.BorderColor,
      elevation: 10, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOpacity: 0.1,
      shadowRadius: 5,
       position: 'absolute',
        zIndex: 9999,
      right:wp(0),
      left:wp(0),
      top:hp(6),
    },
    loactionbtnwrapstyle:{
      backgroundColor:Colors.DarkBackgroundColor +50,
      ...RNStyles.flexRow,
       columnGap:wp(2),
       paddingVertical:hp(0.2),
       paddingHorizontal:wp(2),
       borderRadius:normalize(10),
       alignSelf:'baseline',
       borderWidth:normalize(1),
       borderColor:Colors.Orange
    }
})