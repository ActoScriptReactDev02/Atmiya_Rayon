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
import { DeleleModal } from '../../components'

const Home =  () => {
  const [ordermodal, setordermodal] = useState(false);
  const [isLoading, SetisLoading]= useState(false);
  const [orderData, setorderData] = useState([]);
  const [addressdata, setaddressdata] = useState([]);
  const [editdata, seteditdata] = useState({});
  const [showdeletemodal, setshowdeletemodal] = useState(false);
  const [deletedata, setdeletedata] = useState({})
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
      setordermodal(false)
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
  setTimeout(() => {
      SetisLoading(false)
  }, 500);
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
  seteditdata({});
  getorderdata();
}

const handleeditdata = (data) => {
setordermodal(true);
seteditdata(data)
}

const handledeletebtn = (data) => {
  setshowdeletemodal(true);
  setdeletedata(data)
}

const deleteapi = async() => {
  try{
    const response = await FetchMethod.DELETE({
      EndPoint:`Order?OrderId=${deletedata.OrderUniqueId}`
    })
    if(response.ResponseCode == 0){
      setshowdeletemodal(false);
      handletoast({
      message:response.ResponseMessage,
        Sucess:true,
         Title:'Success'
     })
     setdeletedata({})
      getorderdata();
    }
   }catch(error){
    setshowdeletemodal(false);
     handletoast({
     message:error?.responseMSG.Message,
        Sucess:false,
         Title:'Failed'
     })
  //  console.log('error',error);
    
  }
}

  return (
   <RNContainer isLoading={isLoading}>
    <RNHeader onLeftPress={() => navigation.navigate(NavRoutes.PARTYPROFILE)} backarrowshow={true}  title={'Order History'}/>
    <View>
      <FlatList bounces={false} contentContainerStyle={{rowGap:hp(2), paddingBottom:hp(18)}} data={orderData} renderItem={({item,index}) => (
        <OrderItem item={item} editPress={() => handleeditdata(item)} deletepress={() => handledeletebtn(item)} />
      )}/>
    </View>
   <Pressable onPress={() => setordermodal(true)} style={styles.addbtnstyle}>
     <LottieView autoPlay loop  style={styles.btnstyle} source={require('../../assets/Lottie/AddDetlis.json')}/>
   </Pressable>
      {ordermodal &&<AddOrderModal editData={editdata} toastdata={data => handletoast(data)}  addressData={addressdata} visible={ordermodal} onRequestClose={()=> {setordermodal(false), seteditdata({})}}
       onclose={() => handleordermodal()}/>}
        {showtoast.isShow && <RnToast  Message={showtoast.message} isSuccess={showtoast.Sucess} Title={showtoast.Title}  />}
        {/* <RnToast/> */}
       {showdeletemodal && <DeleleModal onPress={() => deleteapi()} visible={showdeletemodal} title={'Delete Order'} subcontent={'Are you sure you want to remove this order from the list?'} 
        onRequestClose={() => {setshowdeletemodal(false),setdeletedata({})}}/>}
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