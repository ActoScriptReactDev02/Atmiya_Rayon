import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RNContainer, RNInput, RNStyles, RNText, RnToast } from '../../common'
import RNHeader from '../../common/RNHeader'
import LottieView from 'lottie-react-native'
import { Colors, FontFamily, hp, normalize, wp } from '../../theme'
import OrderQRCode from './OrderQRCode'
import FetchMethod from '../../api/FetchMethod'
import Functions from '../../utils/Functions'
import { AddOrderModal, OrderItem } from '../../components/PartyFlow'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'
import { DeleleModal, ImageViewerModal } from '../../components'
import { Images } from '../../constants'

const Home =  () => {
  const [ordermodal, setordermodal] = useState(false);
  const [isLoading, SetisLoading]= useState(false);
  const [orderData, setorderData] = useState([]);
  const [addressdata, setaddressdata] = useState({});
  const [editdata, seteditdata] = useState({});
  const [showdeletemodal, setshowdeletemodal] = useState(false);
  const [deletedata, setdeletedata] = useState({})
  const navigation = useNavigation();
   const [imagevisible, setimagevisible] = useState(false);
   const [selecteddata, Setselecteddata] = useState({});
   const [searchvalue, setsearchvalue] = useState('')
   const [refreshing, setRefreshing] = useState(false);
    const timeoutRef = useRef(null);
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

  useFocusEffect(
    useCallback(() => {
       GetUserAddress();
    },[])
  )

   useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setorderData([]);
      getorderdata();
    }, 500);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchvalue]);
  
    const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getorderdata(); 
    } catch (e) {
      console.log(e);
    }
    setRefreshing(false);
  };

  const getorderdata = async () => {
    try{
      setordermodal(false)
      SetisLoading(true)
      const response = await FetchMethod.POST({
        EndPoint:`Order/GetOrderDetails`,
        Params:{
        "SearchTerm":searchvalue
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
        if(response.Data.length > 0)
        {
           setaddressdata(response.Data[0])
       }
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
   <RNContainer>
    <RNHeader onLeftPress={() => navigation.navigate(NavRoutes.PARTYPROFILE)} backarrowshow={true}  title={'Order History'}/>
    <View style={{flex:1}}>
          <RNInput
          rightloader={isLoading}
          value={searchvalue}
          onChangeText={setsearchvalue}
          leftIconStyle={{  width: wp(6),  height: wp(6),}} 
          leftIcontintColor={Colors.Orange}
          leftIconSource={Images.search} 
          placeholder={'Search by Order Code or Date .....'} 
          containerStyle={styles.in_containerStyle} 
          Inputwrapstyle={{marginBottom:hp(1.5)}} />
     
      <FlatList 
      refreshing={refreshing}           
      onRefresh={onRefresh} 
      refreshControl={
      <RefreshControl
        refreshing={refreshing}      
        onRefresh={onRefresh}         
        colors={[Colors.Orange]}           
        tintColor={Colors.Orange}           
      />}
      contentContainerStyle={{rowGap:hp(2), paddingBottom:hp(18), flex:(!isLoading && orderData.length == 0 )? 1 : 0}} 
      data={orderData} renderItem={({item,index}) => (
        <OrderItem item={item} editPress={() => handleeditdata(item)} deletepress={() => handledeletebtn(item)} orderimagepress={() =>{Setselecteddata(item), setimagevisible(true)}} />
      )}
      ListEmptyComponent={() => ( !isLoading && 
        <View style={{...RNStyles.flexCenter}}>
          <LottieView autoPlay loop  style={{height:wp(60),width:wp(60)}} source={require('../../assets/Lottie/NotFound.json')}/>
          <RNText color={Colors.Orange} family={FontFamily.Medium} children={'No orders found'}/>
        </View> 
      )}
      />
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
       {imagevisible && <ImageViewerModal onRequestClose={() =>{ setimagevisible(false), Setselecteddata({})}} visible={imagevisible} imageURL={selecteddata.OrderPhoto}/>}

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
  },
  in_containerStyle:{
     height: hp(5.5),
     borderColor:Colors.Orange,
     borderWidth:0.5,
  }
})