import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, FontFamily, FontSize, height, hp, normalize, width, wp } from '../../theme'
import { RNButton, RNImage, RNInput, RNStyles, RNText, RnToast } from '../../common'
import { Images } from '../../constants'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import ImagePicker from "react-native-image-crop-picker";
import AddressModal from './AddressModal'
import FetchMethod from '../../api/FetchMethod'
import RNHeader from '../../common/RNHeader'

const AddOrderModal = ({visible, onRequestClose, addressData, onclose, toastdata, editData}) => {
    const [isnavigate, setisnavigate] = useState(false)
    const [datepicker, setdatepicker]= useState(false);
    const [addrssmodal, setaddrssmodal] = useState(false);
    const [selectAddress, setselectAddress] = useState(addressData)
    const [isLoading,setisLoading] = useState(false)
    const [state, setstate] = useState({
        date:new Date(),
        imagedata:{
            uri:'',
            base64:''
        },
        remark:''
    })
    const imageerror = isnavigate && state.imagedata.base64 == ''
    const isvalid = state.date != '' && state.imagedata.base64 != '' && Object.keys(selectAddress).length > 0;

useEffect(() => {
  if(Object.keys(editData).length > 0){
    setselectAddress(editData.AddressDetails),
    setstate(p => ({...p, date: moment(editData.OrderDate, "DD MMM YYYY hh:mm A").toDate() , imagedata:{uri:editData.OrderPhoto}, remark:editData.Remark}))
  } else{
    setstate(p => ({...p, date:new Date(), imagedata:{base64:'',uri:''}, remark:''}))
  }
},[])


const handlegellary = () => {
  ImagePicker.openPicker({
    cropping: true,
    includeBase64: true
  })
  .then((image) => {
    setstate(p => ({...p, imagedata:{uri:image.path, base64:image.data}}))
  })
  .catch((error) => {
    console.log('handlegellary error -->', error);

    if (error.code === 'E_PICKER_CANCELLED') {
       setstate(p => ({...p, imagedata:{uri:image.path, base64:image.data}}))
    }
  });
};

const handlecamara = () => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
    includeBase64: true,
  })
  .then((image) => {
   setstate(p => ({...p, imagedata:{uri:image.path, base64:image.data}}))
  })
  .catch((error) => {
    if (error.code === 'E_PICKER_CANCELLED') {
     setstate(p => ({...p, imagedata:{uri:image.path, base64:image.data}}))
    } else {
      console.log('Camera error:', error);
    }
  });
};


const handleorderadd = async () => {
  setisnavigate(true)
  if(isvalid){
    setisLoading(true)
  try{
    const response = await FetchMethod.POST({
      EndPoint:`Order`,
      Params:{
              "OrderDate": state.date,
              "OrderPhoto": state.imagedata.base64,
              "OrderDeliveryAddressId": selectAddress.Id,
              "Remark": state.remark
              }
    })
    if(response.ResponseCode == 0){
     toastdata({
      message:response.ResponseMessage,
        Sucess:true,
         Title:'Success'
     })
       onclose()
    }
    setisLoading(false)
  }catch(error){
    console.log('Order add api error -->', error);
    onRequestClose();
    setisLoading(false);
     toastdata({
      message:error?.responseMSG.Message,
        Sucess:false,
         Title:'Failed'
     })
  }
  }
}

const handleupdate = async () => {
  setisnavigate(true)
  if (!isvalid) return
  try{
    const response = await FetchMethod.PUT({
      EndPoint:`Order/UpdateOrder/${editData.OrderUniqueId}`,
      Params:{
  "OrderDate": state.date.toISOString(),
  "OrderPhoto": state.imagedata.base64 || '',
  "OrderDeliveryAddressId": selectAddress.Id,
  "Remark": state.remark
}
    })
    
    if(response.ResponseCode == 0){
       toastdata({
      message:response.ResponseMessage,
        Sucess:true,
         Title:'Success'
     })
       onclose()
    }
  }catch(error){
     setisLoading(false);
     toastdata({
      message:error?.responseMSG.Message,
        Sucess:false,
         Title:'Failed'
     })
  }
}


  return (
    <Modal  statusBarTranslucent={true} visible={visible} transparent animationType='slide'>
        <View style={styles.modalcontiner}>
        
          <RNHeader  onLeftPress={() => onRequestClose()} 
          title={Object.keys(editData).length >0 ? 'Modify Order':'Add New Order'}
          />
              {/* <View style={[styles.modalspace,styles.modalhederstyle]}>
                <View>
                    <RNText style={styles.hedeartitlestyle} children={'Add Order'}/>
                    <RNText color={Colors.Grey} children={'Fill in the details below'}/>
                </View>
                <Pressable onPress={() => onRequestClose()}>
                    <RNImage source={Images.close} style={styles.iconestyle}/>
                </Pressable>
              </View> */}
              <ScrollView contentContainerStyle={{flexGrow:1}} bounces={false}>
              <View style={{flex:1,}}>
                   <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <RNImage tintColor={'#FF6B6B'} style={styles.cardiconestyle} source={Images.date}/>
                        <RNText children={'Date'} style={styles.cardTitle}/>
                        <RNText children={'*'} style={styles.requiredStar}/>
                    </View>
                    <TouchableOpacity onPress={() => setdatepicker(true)} style={styles.dateSelector} >
                        <RNImage style={{height:wp(6), width:wp(6)}} source={Images.calendar}/>
                        <RNText style={styles.dateText} children={moment(state.date).format('LL')}/>
                    </TouchableOpacity>
                   </View>
                   <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <RNImage tintColor={'#FF6B6B'} style={styles.cardiconestyle} source={Images.Edit}/>
                        <RNText children={'Remark'} style={styles.cardTitle}/>
                        {/* <RNText children={'*'} style={styles.requiredStar}/> */}
                    </View>
                    <RNInput 
                    value={state.remark}
                    onChangeText={v => setstate(p => ({...p, remark:v}))}
                    Inputwrapstyle={{marginBottom:hp(0)}} 
                    inputStyle={{fontsize:FontSize.font16}} 
                    placeholder={'Enter Remark'}
                     containerStyle={styles.inputcontainerstyle} />
                   </View>
                   <View style={[styles.card,{borderWidth: imageerror ? normalize(1) : 0.4, borderColor: imageerror ? Colors.Orange : Colors.Red}]}>
                    <View style={styles.cardHeader}>
                        <RNImage tintColor={Colors.Blue} style={styles.cardiconestyle} source={Images.camera}/>
                        <RNText children={'Photo'} style={styles.cardTitle}/>
                        <RNText children={'*'} style={styles.requiredStar}/>
                    </View>
                    {state.imagedata.uri !='' ? <View style={styles.photoPreviewContainer}>
                   <RNImage ImageUri={state.imagedata.uri}  style={styles.photoPreview} />
                    <TouchableOpacity
                      style={styles.changePhotoButton}
                      onPress={() => 
                        setstate(p => ({...p, imagedata:{uri:'', base64:''}}))
                      }>
                     <RNImage tintColor={Colors.White} style={styles.cardiconestyle} source={Images.Edit}/>
                      <RNText children={'Change Photo'} style={styles.changePhotoText}/>
                    </TouchableOpacity>
                  </View> :
                  <>
                 <View style={styles.photoOptions}>
                    <TouchableOpacity onPress={()=> handlecamara()}
                      style={[styles.photoOption, styles.cameraOption]} 
                      >
                      <RNImage tintColor={Colors.White} style={styles.cardiconestyle} source={Images.camera}/>
                      <RNText children={'Take Photo'} style={styles.photoOptionText}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => handlegellary()}
                      style={[styles.photoOption, styles.galleryOption]} 
                     >
                       <RNImage tintColor={Colors.White} style={styles.cardiconestyle} source={Images.gallery}/>
                      <RNText children={'Choose from Gallery'} style={styles.photoOptionText}/>
                    </TouchableOpacity>
                  </View>
                 {imageerror && <RNText pTop={hp(1)} children={'**Please upload order photos'} color={Colors.Red} size={FontSize.font12}/>}
                  </>}
                   </View>
                   <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <RNImage tintColor={'#45B7D1'} style={styles.cardiconestyle} source={Images.loaction}/>
                        <RNText children={'Address'} style={styles.cardTitle}/>
                        <RNText children={'*'} style={styles.requiredStar}/>
                    </View>
                    <TouchableOpacity style={styles.dateSelector}  onPress={() => setaddrssmodal(true)}>
                        <View style={styles.selectedAddressIcon}>
                            <RNImage tintColor={'#4CAF50'} style={{height:wp(6), width:wp(6)}} source={Images.loaction}/>
                        </View>
                       <View style={{...RNStyles.flexRow, flex:1, columnGap:wp(1)}}>
                        <View style={{flex:1}}>
                             <RNText family={FontFamily.SemiBold} children={selectAddress?.City}/>
                           <RNText numOfLines={2} style={styles.addresstext} children={selectAddress?.Address}/>
                        </View>
                         <RNImage tintColor={Colors.Grey} style={{height:wp(4), width:wp(4),transform: [
                          {
                            rotate:'180deg',
                          },
                        ],}} source={Images.backarrow}/>
                       </View>
                    </TouchableOpacity>
                   </View>
                  {/* {isLoading ? <View style={styles.btnloaderstyle}>
                    <ActivityIndicator size={'small'} color={Colors.White}/>
                  </View> :<RNButton  onPress={() => Object.keys(editData).length >0 ? handleupdate() : handleorderadd()} btnstyles={{marginTop:hp(0), marginBottom: hp(2)}} title={'Save'}/> } */}
              </View>
              </ScrollView>
              <RNButton isloding={isLoading} disabled={isLoading}  onPress={() => Object.keys(editData).length >0 ? handleupdate() : handleorderadd()} btnstyles={{marginTop:hp(0), marginBottom: hp(2)}} title={'Save'}/> 
        
       {datepicker && <DateTimePickerModal  isVisible={datepicker}  mode='date' value={state.date.toISOString()} 
       onCancel={() => setdatepicker(false)}
       onConfirm={(v) => {setstate(p => ({...p, date:v})), setdatepicker(false)}}
       />}
      
       {addrssmodal && <AddressModal selectaddress={(data) => {setselectAddress(data), setaddrssmodal(false)} } onRequestClose={() => setaddrssmodal(false)} visible={addrssmodal}/>}
        </View>
    </Modal>
  )
}

export default AddOrderModal

const styles = StyleSheet.create({
    modalcontiner:{
        flex:1,
         backgroundColor:Colors.White,
         paddingTop:hp(5),
         paddingHorizontal:wp(4),
         paddingBottom:hp(2)
        // backgroundColor:'#00000056',
        // justifyContent:'flex-end'
    }, modalwrapstyle:{
       // height:hp(80),
       // backgroundColor:Colors.White,
        // borderTopLeftRadius:normalize(20),
        // borderTopRightRadius:normalize(20),
    },
    modalspace:{
        // paddingHorizontal:wp(4),
        // paddingVertical:hp(2.2),
    },
    modalhederstyle:{
        borderBottomWidth:normalize(1),
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:Colors.BorderColor
    },
    hedeartitlestyle:{
        fontSize:FontSize.font19,
        fontFamily:FontFamily.SemiBold
    },
    iconestyle:{
        height:wp(8),
        width:wp(8),
    },
    card: {
    flex:1,
    backgroundColor: Colors.White,
    borderRadius: normalize(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1,
    paddingHorizontal:wp(4),
    paddingVertical:wp(3),
    marginBottom:hp(3),
    borderWidth:0.4,
    borderColor:Colors.Orange
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
    columnGap:wp(3)
  },
  cardTitle: {
    fontSize: FontSize.font18,
    flex: 1,
    fontFamily:FontFamily
    .SemiBold
  },
  cardiconestyle:{
    height:wp(5),
    width:wp(5)
  },
    dateSelector: {
    flexDirection: 'row',
    //alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal:wp(2),
    paddingVertical:hp(1.2),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    columnGap:wp(3),
  },
  dateText: {
    flex: 1,
    fontSize: FontSize.font16,
    color: '#333',
  },
   requiredStar: {
    color: '#FF6B6B',
    fontSize: FontSize.font18,
    fontWeight: FontFamily.Bold,
  },
  photoPreviewContainer: {
    alignItems: 'center',
  },
  photoPreview: {
    width: '100%',
    height: hp(23),
    borderRadius: normalize(12),
    marginBottom:hp(2),
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderRadius: normalize(25),
    columnGap:wp(2)
  },
  changePhotoText: {
    color: '#fff',
    fontSize: FontSize.font14,
   fontWeight:'600'
  },
   photoOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoOption: {
    width:wp(40),
    paddingVertical:hp(2),
    paddingHorizontal:wp(2),
    borderRadius: normalize(12),
    alignItems: 'center',
  },
  cameraOption: {
    backgroundColor: Colors.Orange,
  },
  galleryOption: {
    backgroundColor: Colors.Blue,
  },
  photoOptionText: {
    color: '#fff',
    fontSize: FontSize.font12,
    fontWeight: '600',
    marginTop: hp(1),
  },
  selectedAddressIcon: {
    width: wp(10),
    height: wp(10),
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#4CAF5020'
  },
 addresstext:{
    fontSize:FontSize.font13,
    flex:1
 },
 inputcontainerstyle:{
  backgroundColor: '#f8f8f8',
   borderWidth: 1,
  borderColor: '#eee',
  borderRadius:normalize(10),
  height: hp(5.5),
 },
 btnloaderstyle:{
  backgroundColor:Colors.Orange,
    width:wp(90),
    alignItems:'center',
    paddingVertical:hp(1.8),
    borderRadius:normalize(10),
    marginBottom: hp(2)
 }
})