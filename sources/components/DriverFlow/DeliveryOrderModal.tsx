import { Modal, StyleSheet,TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from "react-native-image-crop-picker";
import { useNavigation } from '@react-navigation/native';
import { NavRoutes } from '../../navigation';
import { RNButton, RNImage, RNStyles, RNText } from '../../common';
import { Colors, FontFamily, FontSize, hp, normalize, wp  } from '../../theme';
import { Images } from '../../constants';
import FetchMethod from '../../api/FetchMethod';

const DeliveryOrderModal = ({visible,onRequestClose,OrderUniqueIds,tosdata, onclose}) => {
  const [state, setstate] = useState({
    deliveryImage: {uri:'', base64:''},
    invoiceDocument: { uri:'',base64:''},
    orderTakerImage: { uri:'',base64:''}
})
  const [isnavigte, setisnavigate] = useState(false)
  const navigation = useNavigation()
  const deliverError = isnavigte && state.deliveryImage.base64 == "";
  const invoiceError = isnavigte && state.invoiceDocument.base64 == "";
  const OrdertaketError = isnavigte && state.orderTakerImage.base64 == "";
  const [isloading, setisloading] = useState(false);
  const isvalid = isnavigte && state.deliveryImage.base64 != "" && state.invoiceDocument.base64 != "" && state.orderTakerImage.base64 != ""
  

  const handlecamara = (type) => {
  ImagePicker.openCamera({
    cropping: true,
    includeBase64: true,
    height:800,
    width:800,
    compressImageQuality: 1,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 800,
  })
  .then((image) => {
  // const fileSizeInMB = image.size / (1024 * 1024);
    setstate(p => ({
  ...p,
  ...(type === 'Order' && {
    deliveryImage: { base64: image.data, uri: image.path }
  }),
  ...(type === 'Invoice' && {
    invoiceDocument: { base64: image.data, uri: image.path }
  }),
  ...(type === 'Taker' && {
    orderTakerImage: { base64: image.data, uri: image.path }
  })
}));
    
  })
  .catch((error) => {
    if (error.code === 'E_PICKER_CANCELLED') {
      setstate((p) => ({
      ...p,
      ...(type === 'Order' && {
        deliveryImage: p.deliveryImage?.uri ? p.deliveryImage : { base64: '', uri: '' }
      }),
      ...(type === 'Invoice' && {
        invoiceDocument: p.invoiceDocument?.uri ? p.invoiceDocument : { base64: '', uri: '' }
      }),
      ...(type === 'Taker' && {
        orderTakerImage: p.orderTakerImage?.uri ? p.orderTakerImage : { base64: '', uri: '' }
      })
    }));
      //setvisible(false)
    } else {
      console.log('Camera error:', error);
    }
  });
};

const UpdateOrderDeliveryStatus = async () =>{
  setisnavigate(true)
  if(isvalid){
  try{
    setisloading(true)
    const response = await FetchMethod.POST({
      EndPoint:`TripMaster/UpdateOrderDeliveryStatus`,
      Params:{
       "OrderUniqueIds": OrderUniqueIds,
       "OrderDeliveryImage": state.deliveryImage.base64,
       "InvoiceDocument": state.invoiceDocument.base64,
      "OrderTakerImage": state.orderTakerImage.base64
     }
    });

    if(response.ResponseCode == 0){
         onRequestClose();
         tosdata({
        isSucess:true,
        titles :'Order Success',
        messages: response.ResponseMessage
      })
    // onclose()
        //navigation.navigate(NavRoutes.TRIPDETAILS,{CustomerId:route.params.CustomerId})
    
    } else{
      tosdata({
        isSucess:false,
        titles :'Order Failed',
        messages: response.ResponseMessage
      })
    }
    setisloading(false)
  }catch(error){
    setisloading(false);
    console.log('UpdateOrderDeliveryStatus error -->', error);
    if(error.responseMSG){
    tosdata({
        isSucess:false,
        titles :'Order Failed',
        messages: error?.responseMSG.Message
      })}
  }}
}
  const ImageUploadSection = ({
  type,           // 'Order', 'Invoice', 'Taker'
  imageState,     // state.deliveryImage / state.invoiceDocument / state.orderTakerImage
  handleCamera,   // function to open picker
  error,          // deliverError / invoiceError / OrderTakerError
  colors,         // button color
  title       // text for button
}) => {
  return imageState.uri !== '' ? (
    // Show image preview if exists
      
    <View style={styles.photoPreview}>
      <RNText size={FontSize.font15} color={colors} family={FontFamily.Bold} children={title}/>
      <RNImage
        resizeMode="cover"
        ImageUri={imageState.uri}
        style={styles.previewimagestyle}
      />
      <TouchableOpacity
        hitSlop={50}
        onPress={() => handleCamera(type)}
        style={styles.editbtnstyle}
      >
        <RNImage
          tintColor={Colors.Blue}
          style={styles.cardiconestyle}
          source={Images.Edit}
        />
      </TouchableOpacity>
    </View>
  ) : (
    // Upload button & error
    <>
      {error && (
        <RNText children={`**Please upload ${title}**`} style={styles.errortextstyle} />
      )}
      <TouchableOpacity
        onPress={() => handleCamera(type)}
        style={[styles.photoOption, styles.cameraOption(colors)]}
      >
        <RNImage
          tintColor={Colors.White}
          style={styles.cardiconestyle}
          source={Images.camera}
        />
        <RNText children={`Take Photo ${title}`} style={styles.photoOptionText} />
      </TouchableOpacity>
    </>
  );
};

  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent statusBarTranslucent={true}>
        <View style={styles.modalcontiner}>
          <View style={styles.modalwrapstyle}>
              <TouchableOpacity disabled={isloading} hitSlop={50} onPress={() => onRequestClose()} style={[styles.closebtnstyle,{opacity: isloading ? 0.5 : 1}]}>
                <RNImage source={Images.close} style={{height:wp(9), width:wp(9)}}/>
               </TouchableOpacity>
                <View style={styles.photoPreviewContainer}> 
                  <ImageUploadSection
                    type="Order"
                    imageState={state.deliveryImage}
                    handleCamera={handlecamara}
                    error={deliverError}
                    colors={Colors.Blue}
                    title="Delivery Order"
                  />
                  <ImageUploadSection
                    type="Invoice"
                    imageState={state.invoiceDocument}
                    handleCamera={handlecamara}
                    error={invoiceError}
                    colors={Colors.Orange}
                    title="Invoice"
                  />
                  <ImageUploadSection
                    type="Taker"
                    imageState={state.orderTakerImage}
                    handleCamera={handlecamara}
                    error={OrdertaketError}
                    colors={Colors.Green}
                    title="Order Taker"
                  />
                  </View>
                  <View style={{alignItems:'center'}}>
                    <RNButton isloding={isloading} onPress={() => UpdateOrderDeliveryStatus()} disabled={isloading} title={'Save'} />
                  </View>
          </View>
        </View>
       </Modal>
  );
};

export default DeliveryOrderModal;

const styles = StyleSheet.create({
  modalcontiner: {
    flex: 1,
    backgroundColor: '#00000056',
    justifyContent: 'flex-end',
  },
  modalwrapstyle: {
    height: hp(80),
    backgroundColor: Colors.White,
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
    paddingBottom: hp(3.5),
  },
  photoPreviewContainer: {
    alignItems: 'center',
    paddingTop: hp(4),
    flex: 1,
  },
  photoPreview: {
    width: '90%',
    height: hp(17),
    borderRadius: normalize(12),
    marginBottom: hp(3),
    overflow: 'hidden',
    //backgroundColor:'red'
  },
  closebtnstyle: {
    alignItems: 'flex-end',
    marginRight: wp(3),
    marginTop: hp(1.2),
    zIndex: 10,
  },
  photoOption: {
    width: wp(90),
    paddingVertical: hp(2.8),
    paddingHorizontal: wp(2),
    borderRadius: normalize(12),
    alignItems: 'center',
    marginBottom: hp(3),
  },
  cameraOption: bgclor => ({
    backgroundColor: bgclor,
  }),
  photoOptionText: {
    color: Colors.White,
    fontSize: FontSize.font14,
    marginTop: hp(1.2),
    fontFamily: FontFamily.Medium,
  },
  cardiconestyle: {
    height: wp(7),
    width: wp(7),
  },
  errortextstyle: {
    color: Colors.Red,
    fontSize: FontSize.font13,
    fontFamily: FontFamily.Medium,
  },
  previewimagestyle: {
    ...RNStyles.image100,
    overflow: 'hidden',
    borderRadius: normalize(12),
  },
  editbtnstyle: {
    position: 'absolute',
    top: hp(8),
    left: wp(40),
    backgroundColor: Colors.White,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(0.5),
    borderRadius: normalize(50),
  },
});
