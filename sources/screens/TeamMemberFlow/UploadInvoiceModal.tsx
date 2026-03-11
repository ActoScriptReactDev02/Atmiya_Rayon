import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, FontSize, hp, normalize, wp } from '../../theme'
import ImagePicker from "react-native-image-crop-picker";
import { Images } from '../../constants';
import { RNButton, RNImage, RNStyles, RNText } from '../../common';
import FetchMethod from '../../api/FetchMethod';

const UploadInvoiceModal = ({onRequestClose,OrderUniqueId,visible,toastdata,onclose}) => {
    const [state, setstate] = useState({
           uri:'',
           base64:''
        })
const [isloading,setisloading] = useState(false);

const handlegellary = () => {
  ImagePicker.openPicker({
    cropping: true,
    includeBase64: true
  })
  .then((image) => {
    setstate(p => ({
      ...p,
      uri: image.path,
      base64: image.data
    }));
  })
  .catch((error) => {
    console.log('handlegellary error -->', error);

    if (error.code === 'E_PICKER_CANCELLED') {
      setstate(p => ({
        ...p,
        uri: '',
        base64: ''
      }));
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
    setstate(p => ({
      ...p,
      uri: image.path,
      base64: image.data
    }));
  })
  .catch((error) => {
    if (error.code === 'E_PICKER_CANCELLED') {
      // user cancelled
      setstate(p => ({
        ...p,
        uri: '',
        base64: ''
      }));
    } else {
      console.log('Camera error:', error);
    }
  });
};

const updateinvoice = async () => {
    try{
      setisloading(true);
    const response = await FetchMethod.POST({
            EndPoint:`Order/UpdateOrderStatus`,
            Params:{
              "OrderUniqueId": OrderUniqueId,
             "UploadInvoice":state.base64
            }
        })
    
        if(response.ResponseCode == 0){
           toastdata({
      message:response.ResponseMessage,
        Sucess:true,
         Title:'Success'
     });
            onclose();
            setisloading(false);
        }
    }catch(error){
        console.log('updateinvoice error -->',error);
        setisloading(false);
         toastdata({
      message:error?.responseMSG.Message,
        Sucess:false,
         Title:'Failed'
     })
        
    }
}



  return (
   <Modal visible={visible} transparent statusBarTranslucent={true} onRequestClose={onRequestClose}>
    <View style={styles.modalcontiner}>
        <View style={styles.modalwrapstyle}>
             <Pressable onPress={() => onRequestClose()} style={styles.closebtnstyle}>
                  <RNImage source={Images.close} style={styles.iconestyle}/>
               </Pressable>
        {state.uri !='' ? <View style={styles.photoPreviewContainer}> 
                   <RNImage ImageUri={state.uri}  style={styles.photoPreview} />
                   <View style={styles.btnwrapstyle}>
                    <TouchableOpacity disabled={isloading}
                      style={[styles.changePhotoButton,{  backgroundColor: Colors.Blue,}]}
                      onPress={() => 
                        setstate(p => ({...p, uri:'', base64:''}))
                      }>
                     <RNImage tintColor={Colors.White} style={styles.cardiconestyle} source={Images.Edit}/>
                      <RNText children={'Change Photo'} style={styles.changePhotoText}/>
                    </TouchableOpacity>
                  <TouchableOpacity disabled={isloading}
                     style={[styles.changePhotoButton,{  backgroundColor: Colors.Orange,}]}
                      onPress={() => updateinvoice()}>
                    {isloading ? <ActivityIndicator size={'small'} color={Colors.White}/> :  <RNText  children={'Save'} style={styles.changePhotoText}/>}
                    </TouchableOpacity>
                    </View>
                  </View> :
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
                  </View>}
        </View>
    </View>
   </Modal>
  )
}

export default UploadInvoiceModal

const styles = StyleSheet.create({
    modalcontiner:{
        flex:1,
        backgroundColor:'#00000056',
        justifyContent:'flex-end'
    },
     modalwrapstyle:{
        backgroundColor:Colors.White,
        borderTopLeftRadius:normalize(20),
        borderTopRightRadius:normalize(20),
        paddingHorizontal:wp(4),
        paddingVertical:hp(5)
    },
    photoPreviewContainer: {
    alignItems: 'center',
  },
  photoPreview: {
    width: '100%',
    height: hp(24),
    borderRadius: normalize(12),
    marginBottom:hp(2),
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderRadius: normalize(10),
    columnGap:wp(2),
    width:wp(42),
    justifyContent:'center'
  },
  changePhotoText: {
    color: '#fff',
    fontSize: FontSize.font14,
   fontWeight:'600',
  },
   photoOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical:hp(2)
  },
  photoOption: {
    width:wp(43),
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
    cardiconestyle:{
    height:wp(5),
    width:wp(5)
  },
  iconestyle:{
        height:wp(8),
        width:wp(8),
    },
    closebtnstyle:{
        position:'absolute',
        right:wp(2),
        top:hp(1)
    },
    btnwrapstyle:{
        ...RNStyles.flexRow,
        columnGap:wp(4)
    }
})