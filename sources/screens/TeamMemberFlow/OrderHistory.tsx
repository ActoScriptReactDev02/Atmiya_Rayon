import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RNContainer, RNStyles, RNText, RnToast } from '../../common'
import RNHeader from '../../common/RNHeader'
import FetchMethod from '../../api/FetchMethod'
import { OrderItem } from '../../components/TeamMember'
import UploadInvoiceModal from './UploadInvoiceModal'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'
import { ImageViewerModal } from '../../components'

const OrderHistory = () => {
const [isloding,setisloading] = useState(false);
const [data, setdata] = useState([]);
const [selecteddata, Setselecteddata] = useState({});
const [uploadModal, setuploadModal] = useState(false);
const navigtions = useNavigation();
  const [showtoast,Setshowtoast] = useState({
  isShow:false,
  message:'',
  Sucess:false,
  Title:''
})
  const [imagevisible, setimagevisible] = useState(false);


  useEffect(() => {
    getorderapi()
  },[])

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

  const getorderapi = async () => {
    try{
      setisloading(true)
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

  return (
    <RNContainer isLoading={isloding}>
      <RNHeader onLeftPress={()=> navigtions.navigate(NavRoutes.TEAMPROFILE)} backarrowshow={true} title={'Order History'} />
      <FlatList  keyExtractor={(item,index) => index.toString()}  data={data} 
      renderItem={({item,inex}) => (
        <OrderItem items={item} onPress={() => {Setselecteddata(item),setuploadModal(true)}} orderimagepress={() =>{Setselecteddata(item), setimagevisible(true)}}/>
      )}
      ListEmptyComponent={() => !isloding && <View style={{...RNStyles.flexCenter}}>
        <RNText children={'No data found'}/>
      </View>}/>
     {uploadModal && <UploadInvoiceModal toastdata={data => handletoast(data)} visible={uploadModal} OrderUniqueId={selecteddata.OrderUniqueId} 
     onRequestClose={() => {setuploadModal(false), Setselecteddata({})}} onclose={() => {setuploadModal(false), Setselecteddata({}),getorderapi()}} />}
       {showtoast.isShow && <RnToast  Message={showtoast.message} isSuccess={showtoast.Sucess} Title={showtoast.Title}  />}
       {imagevisible && <ImageViewerModal onRequestClose={() =>{ setimagevisible(false), Setselecteddata({})}} visible={imagevisible} imageURL={selecteddata.OrderPhoto}/>}
    </RNContainer>
  )
}

export default OrderHistory

const styles = StyleSheet.create({
 
})