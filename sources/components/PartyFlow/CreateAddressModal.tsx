import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { RNButton, RNImage, RNInput, RnlabelInput, RNStyles, RNText, RnToast } from '../../common'
import RNHeader from '../../common/RNHeader'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../../theme'
import { Images } from '../../constants'
import { KeyboardAvoidingView, KeyboardAwareScrollView, KeyboardGestureArea, KeyboardStickyView } from 'react-native-keyboard-controller'
import FetchMethod from '../../api/FetchMethod'
import { useSelector } from 'react-redux'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LottieView from 'lottie-react-native'


const CreateAddressModal = ({visible,onRequestClose,onclose,Editdata}) => {
   const [isnavigate, setisnavigate] = useState(false)
   const [isLoading, setisLoading] = useState(false)
   const  {AsyncValue} = useSelector(state => state.Auth);
   const [areaCodeData, setareaCodeData] = useState([]);
   const [arealoading, setarealoading] = useState(false);
   const [isShow, setisShow] = useState(false)
   const [showtoast,Setshowtoast] = useState({
     isShow:false,
     message:'',
     Sucess:false,
     Title:''
   })
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
        console.log('AddUserAddress response',response);
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
        console.log('AddUserAddress error --->', error);
        
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
              "Latitude": state.loactionData.lat,
              "Longitude": state.loactionData.lng,
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
        console.log('updateaddress error -->', error);
        
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
    console.log('GetAreaCode api error --->', error);
    
  }
}
 

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} statusBarTranslucent={true} style={{zIndex:999}}>
        <View style={styles.modalcontiner}>
            <RNHeader onLeftPress={onRequestClose} title={'Add New Address'}  />
            <KeyboardAwareScrollView 
            style={{flex:1}}
            // bounces={false}
            // contentContainerStyle={{ flexGrow: 1 }}
            // enableOnAndroid={true}
            >
          <KeyboardAvoidingView>
            <View style={{ paddingTop:hp(1), flex:1}}>
              <View style={{marginBottom:hp(1.5)}}>
              <View style={styles.labelwrapstyle}>
                <RNText style={styles.labelstyle} children={'Loaction (Google)'}/>
                 <RNText color={Colors.Red} children={'*'}/>
              </View>
              <GooglePlacesAutocomplete
              keyboardShouldPersistTaps="handled"
              fetchDetails={true}
                  styles={{
                          container: {
                            marginBottom: hp(1),
                            flex: 0,
                            zIndex: 9999,
                          },
                          textInput: {
                            ...styles.googletextinput, 
                          },
                          listView: {
                            ...styles.googlelistview,   
                          },
                          poweredContainer: {
                            display: 'none',
                          },
                        }}
                keepResultsAfterBlur={false}
                textInputProps={{
                  placeholderTextColor: Colors.Grey, // 👈 change color here
                   value: state.loactionData.description,
                  onChangeText: (text) => setstate(p => ({...p, loactionData:{description:text}})),
                 }}
                     placeholder='Type to search Location...'
                    onPress={(data, details = null) => {
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
                 {loactionerror &&  <RNText size={FontSize.font9} color={Colors.Red} children={'Please enter a valid loaction'}/>}
                  </View>
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
      elevation: 3, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOpacity: 0.1,
      shadowRadius: 5,
       position: 'absolute',
        zIndex: 9999,
      right:wp(0),
      left:wp(0),
      top:hp(6),
    }
})