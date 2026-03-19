import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RNButton, RNContainer, RNImage, RNText, RnToast } from '../../common'
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
  const [state, setstate] = useState({
         uri:'',
         base64:''
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

  
  const handlecamara = () => {
  ImagePicker.openCamera({
    cropping: true,
    includeBase64: true,
  })
  .then((image) => {
    setstate(p => ({
      ...p,
      uri: image.path,
      base64: image.data
    }));
    setvisible(true)
  })
  .catch((error) => {
    if (error.code === 'E_PICKER_CANCELLED') {
      setstate(p => ({
        ...p,
        uri: '',
        base64: ''
      }));
      setvisible(false)
    } else {
       setvisible(false)
      console.log('Camera error:', error);
    }
  });
};

const onRequestClose = () => {
  setvisible(false);
  setselctedata({})
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
  try{
    setisloading(true)
    const response = await FetchMethod.POST({
      EndPoint:`TripMaster/UpdateOrderDeliveryStatus`,
      Params:{
       "OrderUniqueIds": selctedata.OrderUniqueId,
       "OrderDeliveryImage": state.base64
     }
    });
    console.log('response',response);
    if(response.ResponseCode == 0){
      console.log('data[0].OrderUniqueId',data[0].OrderUniqueId);
    setdata((prev) =>
          prev.map((item) =>
            item.OrderUniqueId === response.data[0].OrderUniqueId
              ? { ...item, IsDelivered: response.data[0].IsDelivered }
              : item,
          ),)
         onRequestClose();
         handletoast(true,'Order Delivered',response.ResponseMessage)
         navigation.navigate(NavRoutes.TRIPDETAILS)
    } else{
      handletoast(false,'Order Failed',response.ResponseMessage)
    }
    setisloading(false)
  }catch(error){
    setisloading(false);
    console.log('UpdateOrderDeliveryStatus error -->', error);
    if(error.responseMSG){
    handletoast(false,'Order Failed',error?.responseMSG.Message)}
  }
}


      
    
  return (
 <RNContainer>
    <RNHeader title={'Verify Order'}/>
   <FlatList contentContainerStyle={{rowGap:hp(2)}} data={data} renderItem={({item,index}) => (
     <Pressable onPress={() => {handlecamara(),setselctedata(item)}}  disabled={item.IsDelivered} style={[styles.card,{opacity : item.IsDelivered ? 0.6 :1, borderColor:item.IsDelivered ? Colors.Green :Colors.Orange}]}>
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
          <TouchableOpacity hitSlop={50} onPress={() => onRequestClose()} style={styles.closebtnstyle}>
                   <RNImage source={Images.close} style={{height:wp(9), width:wp(9)}}/>
           </TouchableOpacity>
            <View style={styles.photoPreviewContainer}> 
               <RNImage ImageUri={state.uri}  style={styles.photoPreview} />
              </View>
              <View style={styles.photoPreviewContainer}>
                <RNButton onPress={() => UpdateOrderDeliveryStatus()} disabled={isloading} title={'Save'} btnstyles={{opacity:isloading ? 0.5 : 1}}/>
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
      height:hp(50),
      backgroundColor:Colors.White,
      borderTopLeftRadius:normalize(20),
      borderTopRightRadius:normalize(20),
      // alignItems:'center',
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
     closebtnstyle:{
      alignItems:'flex-end',
      marginRight:wp(3),
      marginTop:hp(1.2),
      zIndex:10
    },
})