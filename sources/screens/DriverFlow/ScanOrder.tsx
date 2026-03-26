import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RNButton, RNContainer, RNImage, RNStyles, RNText, RnToast } from '../../common'
import RNHeader from '../../common/RNHeader'
import { Colors, FontFamily, FontSize, height, hp, normalize, width, wp } from '../../theme'
import { Images } from '../../constants'
import ImagePicker from "react-native-image-crop-picker";
import { Pressable } from 'react-native-gesture-handler'
import FetchMethod from '../../api/FetchMethod'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'

const ScanOrder = ({route}) => {
  const [data,setdata] = useState(route.params.Data);
  const [isnavigte, setisnavigate] = useState(false)
  const [state, setstate] = useState({
    deliveryImage: {uri:'', base64:''},
    invoiceDocument: { uri:'',base64:''},
    orderTakerImage: { uri:'',base64:''}
})
  const [selctedata, setselctedata] = useState({});
  const [isloading, setisloading] = useState(false);
  const [visible, setvisible] = useState(false);
    const [showtoast,Setshowtoast] = useState({
    isShow:false,
    message:'',
    Sucess:false,
    Title:''
  })
  const navigation = useNavigation()

  const deliverError = isnavigte && state.deliveryImage.base64 == "";
  const invoiceError = isnavigte && state.invoiceDocument.base64 == "";
  const OrdertaketError = isnavigte && state.orderTakerImage.base64 == "";

  const isvalid = isnavigte && state.deliveryImage.base64 != "" && state.invoiceDocument.base64 != "" && state.orderTakerImage.base64 != ""
console.log('state',state);

  
  const handlecamara = (type) => {
  ImagePicker.openCamera({
    cropping: true,
    includeBase64: true,
  })
  .then((image) => {
    // setstate(p => ({
    //   ...p,
    //   uri: image.path,
    //   base64: image.data
    // }));
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
    setvisible(true)
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
       setvisible(false)
      console.log('Camera error:', error);
    }
  });
};

const onRequestClose = () => {
  setvisible(false);
  setselctedata({});
  setstate(p => ({...p,
    deliveryImage:{base64:'',uri:''},
    invoiceDocument:{base64:'',uri:''},
    orderTakerImage:{base64:'',uri:''}
  }))
}

  const handletoast = (isSucess,titles,messages) => {
   Setshowtoast({
           isShow: true,
           Sucess: isSucess,
           Title: titles,
           message: messages,
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

const UpdateOrderDeliveryStatus = async () =>{
  setisnavigate(true)
  if(isvalid){
  try{
    setisloading(true)
    const response = await FetchMethod.POST({
      EndPoint:`TripMaster/UpdateOrderDeliveryStatus`,
      Params:{
       "OrderUniqueIds": selctedata.OrderUniqueId,
       "OrderDeliveryImage": state.deliveryImage.base64,
       "InvoiceDocument": state.invoiceDocument.base64,
      "OrderTakerImage": state.orderTakerImage.base64
     }
    });
  //console.log('response',response);
    if(response.ResponseCode == 0){
      console.log('data[0].OrderUniqueId',data[0].OrderUniqueId);
    // setdata((prev) =>
    //       prev.map((item) =>
    //         item.OrderUniqueId === response.data[0].OrderUniqueId
    //           ? { ...item, IsDelivered: response.data[0].IsDelivered }
    //           : item,
    //       ),)
         onRequestClose();
         handletoast(true,'Order Delivered',response.ResponseMessage)
         navigation.navigate(NavRoutes.TRIPDETAILS,{CustomerId:route.params.CustomerId})
    } else{
      handletoast(false,'Order Failed',response.ResponseMessage)
    }
    setisloading(false)
  }catch(error){
    setisloading(false);
    console.log('UpdateOrderDeliveryStatus error -->', error);
    if(error.responseMSG){
    handletoast(false,'Order Failed',error?.responseMSG.Message)}
  }}
}

const ImageUploadSection = ({
  type,           // 'Order', 'Invoice', 'Taker'
  imageState,     // state.deliveryImage / state.invoiceDocument / state.orderTakerImage
  handleCamera,   // function to open picker
  error,          // deliverError / invoiceError / OrderTakerError
  colors,         // button color
  title           // text for button
}) => {
  return imageState.uri !== '' ? (
    // Show image preview if exists
    <View style={styles.photoPreview}>
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
 <RNContainer>
    <RNHeader title={'Verify Order'}/>
   <FlatList contentContainerStyle={{rowGap:hp(2)}} data={data} renderItem={({item,index}) => (
     <Pressable onPress={() => {setselctedata(item), setvisible(true)}}  disabled={item.IsDelivered} style={[styles.card,{opacity : item.IsDelivered ? 0.6 :1, borderColor:item.IsDelivered ? Colors.Green :Colors.Orange}]}>
       <View style={{paddingBottom:hp(1)}}>
         <RNText size={FontSize.font13} family={FontFamily.SemiBold}  children={item.OrderCode}/>
         <View style={{position:'absolute', right:wp(2)}}>
          <RNImage tintColor={item.IsDelivered ? Colors.Green :Colors.Orange} source={item.IsDelivered ? Images.DeliveryDone : Images.DeliveryPending} style={{height:wp(10), width:wp(10)}}/>
         </View>
       </View>
         <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.date}/>
             <RNText numOfLines={2}  style={styles.valuetextstyle} children={item.OrderDate}/>
           </View>
            <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.loaction}/>
             <RNText numOfLines={2}  style={styles.valuetextstyle} children={item.Address + ', '+ item.Landmark + ', '+item.City+ ', '+ item.Pincode}/>
           </View>
            <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.cityicone}/>
             <RNText numOfLines={2}  style={styles.valuetextstyle} children={item.City+ ', '+ item.Pincode}/>
           </View>
    </Pressable>
   )}/>
   {visible && <Modal onRequestClose={() => onRequestClose()} visible={visible} transparent statusBarTranslucent={true}>
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
   </Modal>}
    {showtoast.isShow && <RnToast  Message={showtoast.message} isSuccess={showtoast.Sucess} Title={showtoast.Title}  />}
   {/* <ToastModal title={'Order Delivered'} subcontent={'The order has been successfully delivered to the customer.'}/> */}
 </RNContainer>
  )
}   

export default ScanOrder

const styles = StyleSheet.create({
    card:{
        backgroundColor: Colors.White,
        paddingHorizontal:wp(2),
        paddingVertical:hp(1),
        borderRadius:normalize(8),
        borderWidth:1
    },
      detailswrapstyle:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        columnGap:wp(1.5),
        paddingVertical:hp(0.2)
    },
    iconestyle:{
      height:wp(4),
      width:wp(4),
    },
    valuetextstyle:{
      flex:1,
      fontFamily:FontFamily.Medium,
      fontSize:FontSize.font13
    },
    modalcontiner:{
        flex:1,
        backgroundColor:'#00000056',
        justifyContent:'flex-end'
    },
    modalwrapstyle:{
      height:hp(75),
      backgroundColor:Colors.White,
      borderTopLeftRadius:normalize(20),
      borderTopRightRadius:normalize(20),
      paddingBottom:hp(3.5),
    },
    photoPreviewContainer: {
    alignItems: 'center',
    paddingTop:hp(4),
    flex:1
  },
  photoPreview: {
    width: '90%',
    height: hp(15),
    borderRadius: normalize(12),
    marginBottom:hp(3),
    overflow:'hidden'
    //backgroundColor:'red'
  },
     closebtnstyle:{
      alignItems:'flex-end',
      marginRight:wp(3),
      marginTop:hp(1.2),
      zIndex:10
    },
  photoOption: {
    width:wp(90),
    paddingVertical:hp(2.8),
    paddingHorizontal:wp(2),
    borderRadius: normalize(12),
    alignItems: 'center',
    marginBottom:hp(3)
  },
    cameraOption: (bgclor) =>({
    backgroundColor: bgclor,
  }),
    photoOptionText: {
    color: Colors.White,
    fontSize: FontSize.font14,
    marginTop: hp(1.2),
    fontFamily:FontFamily.Medium
  },
    cardiconestyle:{
    height:wp(7),
    width:wp(7)
  },
  errortextstyle:{
    color:Colors.Red,
    fontSize:FontSize.font13,
    fontFamily:FontFamily.Medium
  },
  previewimagestyle:{
    ...RNStyles.image100,
    overflow:'hidden',
     borderRadius: normalize(12),
  },
  editbtnstyle:{
    position:'absolute',
    top:hp(5),
    left:wp(40),
     backgroundColor:Colors.White,
    paddingVertical:hp(0.5),
    paddingHorizontal:wp(0.5), 
    borderRadius:normalize(50)
  }
})