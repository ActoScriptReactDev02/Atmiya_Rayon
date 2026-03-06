import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RNContainer, RnToast } from '../../common'
import RNHeader from '../../common/RNHeader'
import LottieView from 'lottie-react-native'
import { hp, wp } from '../../theme'
import OrderQRCode from './OrderQRCode'
import FetchMethod from '../../api/FetchMethod'
import Functions from '../../utils/Functions'
import { AddOrderModal, OrderItem } from '../../components/PartyFlow'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'

const Home =  () => {
  const [ordermodal, setordermodal] = useState(false);
  const [isLoading, SetisLoading]= useState(false);
  const [orderData, setorderData] = useState([]);
  const [addressdata, setaddressdata] = useState([]);
  const navigation = useNavigation();
        const [showtoast,Setshowtoast] = useState({
        isShow:false,
        message:'',
        Sucess:false,
        Title:''
      })

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

  useEffect(() => {
    getorderdata();
    GetUserAddress();
  },[])

  const getorderdata = async () => {
    try{
      SetisLoading(true)
      const response = await FetchMethod.POST({
        EndPoint:`Order/GetOrderDetails`,
        Params:{
            "OrderCode": "",
            "OrderDate": null,
            "Address": "",
            "City": "",
            "Landmark": "",
            "Pincode": "",
            "FristName": "",
            "LastName": ""
      }
      })
      //console.log('response',response);
      if(response.length > 0){
        setorderData(response)
      }else{setorderData([])}
    SetisLoading(false)
    }catch(error){
      SetisLoading(false);
      setorderData([]);
      console.log('getorderdata api error ===>', error);
    }
  }

  const GetUserAddress = async () => {
    try{
      const response = await FetchMethod.GET({
        EndPoint:`UserMaster/GetUserAddress`
      })
     // console.log('response',response);
      if(response.ResponseCode == 0){
      setaddressdata(response.Data)
      }else{
        setaddressdata([])
      }
    }catch(error){
      console.log('GetUserAddress error -->', error);
      
    }
  }
  
const handleordermodal = () => {
  setordermodal(false);
  getorderdata();
}

  return (
   <RNContainer isLoading={isLoading}>
    <RNHeader onLeftPress={() => navigation.navigate(NavRoutes.PARTYPROFILE)} backarrowshow={true}  title={'Order History'}/>
    <View>
      <FlatList bounces={false} contentContainerStyle={{rowGap:hp(2), paddingBottom:hp(6)}} data={orderData} renderItem={({item,index}) => (
        <OrderItem item={item} />
      )}/>
    </View>
   <Pressable onPress={() => setordermodal(true)} style={styles.addbtnstyle}>
     <LottieView autoPlay loop  style={styles.btnstyle} source={require('../../assets/Lottie/AddDetlis.json')}/>
   </Pressable>
      {ordermodal &&<AddOrderModal toastdata={data => handletoast(data)}  addressData={addressdata} visible={ordermodal} onRequestClose={()=> setordermodal(false)}
       onclose={() => handleordermodal()}/>}
        {showtoast.isShow && <RnToast  Message={showtoast.message} isSuccess={showtoast.Sucess} Title={showtoast.Title}  />}
        {/* <RnToast/> */}
   </RNContainer>
  )
}

export default Home

const styles = StyleSheet.create({
  btnstyle:{
    height:wp(25),
    width:wp(25)
  },
  addbtnstyle:{
    position:'absolute',
    bottom:hp(0),
    right:wp(0)
  }
})