import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { RNButton, RNImage, RNInput, RnlabelInput, RNStyles, RNText, RnToast } from '../../common'
import RNHeader from '../../common/RNHeader'
import { Colors, FontFamily, hp, normalize, wp } from '../../theme'
import { Images } from '../../constants'
import { KeyboardAvoidingView, KeyboardAwareScrollView, KeyboardGestureArea, KeyboardStickyView } from 'react-native-keyboard-controller'
import FetchMethod from '../../api/FetchMethod'
import { useSelector } from 'react-redux'

const CreateAddressModal = ({visible,onRequestClose,onclose,Editdata}) => {
   const [isnavigate, setisnavigate] = useState(false)
   const [isLoading, setisLoading] = useState(false)
   const  {AsyncValue} = useSelector(state => state.Auth);
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
        defult:false
    })
const addresserror = isnavigate && state.address.trim().length < 5;
const cityerror = isnavigate && state.city.trim().length < 2;
const landmarerror = isnavigate && state.landmark.trim().length < 2;
const pincodeerror = isnavigate && !/^\d{6}$/.test(state.pincode);

const isValid =
  state.address.trim().length >= 5 &&
  state.city.trim().length >= 2 &&
  state.landmark.trim().length >= 2 &&
  /^\d{6}$/.test(state.pincode);

  useEffect(() => {
    if(Editdata !=null && Object.keys(Editdata).length > 0){
  setstate(p => ({
            ...p,
            address:Editdata.Address, 
            city: Editdata.City, 
            defult: Editdata.IsDefault, 
            landmark: Editdata.Landmark,
            pincode:Editdata.Pincode
        }))
    }else{
        setstate(p => ({
            ...p,
            address:'', city:'', defult:false, landmark:'',pincode:''
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
             "Location": "Katargam Darwaja, Surat, Gujarat, India",
             "Latitude": "21.22539",
             "Longitude": "72.8068017"
           }
        })
       // console.log('AddUserAddress response',response);
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
              "Location": Editdata.Location,
              "Latitude": "21.22539",
              "Longitude": "72.8068017"
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
                <RnlabelInput 
                labeltitle={'Loaction (Google)'} 
                placeholder={'Type to search Location...'}/>
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
    }
})