import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RNContainer, RNInput, RNStyles, RNText, RnToast } from '../../common'
import RNHeader from '../../common/RNHeader'
import FetchMethod from '../../api/FetchMethod'
import { ConfirmationModal, OrderItem } from '../../components/TeamMember'
import UploadInvoiceModal from './UploadInvoiceModal'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'
import { ImageViewerModal } from '../../components'
import LottieView from 'lottie-react-native'
import { Colors, FontFamily, hp, wp } from '../../theme'
import { Images } from '../../constants'

const OrderHistory = () => {
const [isloding,setisloading] = useState(false);
const [data, setdata] = useState([]);
const [selecteddata, Setselecteddata] = useState({});
const navigtions = useNavigation();
const [imagevisible, setimagevisible] = useState(false);
const [searchvalue, setsearchvalue] = useState('')
const timeoutRef = useRef(null);
const [refreshing, setRefreshing] = useState(false);
const [confirmModal, setconfirmModal] = useState(false);
  const [showtoast,Setshowtoast] = useState({
  isShow:false,
  message:'',
  Sucess:false,
  Title:''
})

  const getorderapi = async () => {
    try{
      setisloading(true)
      const response = await FetchMethod.POST({
        EndPoint:`Order/GetOrderDetails`,
        Params:{
         "SearchTerm": searchvalue
      }
      })
      if(response.length > 0){
        setdata(response)
      }else{
        setdata([])
      }
      setisloading(false)
    }catch(error){
       setdata([])
       setisloading(false)
    }
  }

  useEffect(() => {
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setdata([]);
      getorderapi() 
    },500);
    return () => {
      if(timeoutRef.current){
         clearTimeout(timeoutRef.current);
      }
    };
  },[searchvalue])

  const onRefresh = async () => {
  setRefreshing(true);
  try {
    await getorderapi(); 
  } catch (e) {
    //console.log(e);
  }
  setRefreshing(false);
};

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

  return (
    <RNContainer>
      <RNHeader onLeftPress={()=> navigtions.navigate(NavRoutes.TEAMPROFILE)} backarrowshow={true} title={'Order History'} />
      <RNInput
          rightloader={isloding}
          value={searchvalue}
          onChangeText={setsearchvalue}
          leftIconStyle={{  width: wp(6),  height: wp(6),}} 
          leftIcontintColor={Colors.Orange}
          leftIconSource={Images.search} 
          placeholder={'Search by Order Code or Date .....'} 
          containerStyle={styles.in_containerStyle} 
          Inputwrapstyle={{marginBottom:hp(1.5)}} />
      <FlatList 
      keyExtractor={(item,index) => index.toString()}  
      data={data}  
      contentContainerStyle={{flex:(!isloding && data.length == 0 )? 1 : 0}}
      refreshing={refreshing}   
      onRefresh={onRefresh}
      refreshControl={
      <RefreshControl
        refreshing={refreshing}      
        onRefresh={onRefresh}         
        colors={[Colors.Orange]}           
        tintColor={Colors.Orange}           
      />}
      renderItem={({item,inex}) => (
        <OrderItem onPress={() => {Setselecteddata(item),setconfirmModal(true)}} items={item}  orderimagepress={() =>{Setselecteddata(item), setimagevisible(true)}}/>
      )}
      ListEmptyComponent={() => ( !isloding && 
        <View style={{...RNStyles.flexCenter}}>
          <LottieView autoPlay loop  style={{height:wp(60),width:wp(60)}} source={require('../../assets/Lottie/NotFound.json')}/>
          <RNText color={Colors.Orange} family={FontFamily.Medium} children={'No orders found'}/>
        </View> 
      )}
      />
     { confirmModal && <ConfirmationModal description={'Are you sure you want to finalize this order? This will mark the order as confirmed.'} visible={confirmModal} toastdata={data => handletoast(data)}  OrderUniqueId={selecteddata.OrderUniqueId} 
     onRequestClose={() => {setconfirmModal(false), Setselecteddata({})}} onclose={() => {setconfirmModal(false), Setselecteddata({}),getorderapi()}}/>}
      {imagevisible && <ImageViewerModal onRequestClose={() =>{ setimagevisible(false), Setselecteddata({})}} visible={imagevisible} imageURL={selecteddata.OrderPhoto}/>}
        {showtoast.isShow && <RnToast  Message={showtoast.message} isSuccess={showtoast.Sucess} Title={showtoast.Title}  />}
    </RNContainer>
  )
}

export default OrderHistory

const styles = StyleSheet.create({
  in_containerStyle:{
     height: hp(5.5),
     borderColor:Colors.Orange,
     borderWidth:0.5,
  }
})