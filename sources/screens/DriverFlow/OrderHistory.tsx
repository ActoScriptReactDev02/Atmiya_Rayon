import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RNContainer, RNStyles, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import FetchMethod from '../../api/FetchMethod'
import { OrderItemView } from '../../components/DriverFlow'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'

const OrderHistory = () => {
  const [data, setdata] = useState([])
  const [isloading, setisloading] = useState(false)
  const navigation = useNavigation()

useEffect(() => {
 GetTripDetails()
},[])

  const GetTripDetails = async () => {
    try{
      setisloading(true)
     const response = await FetchMethod.GET({
      EndPoint:`TripMaster/GetTripDetails`
     })

    // console.log('response',response);
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
   <RNContainer>
    <RNHeader onLeftPress={() => navigation.navigate(NavRoutes.DRIVERPROFILE)} backarrowshow={true} title={'Order History'}/>
    <View style={{flex:1}}>
      <FlatList bounces={false} data={data} 
      renderItem={({item,index}) => (
       <OrderItemView/>
      )}
      ListEmptyComponent={() => (!isloading && 
      <View style={{...RNStyles.flexCenter}}>
        <RNText children={'No Data Found'}/>
      </View>)}
      />
    </View>
   </RNContainer>
  )
}

export default OrderHistory

const styles = StyleSheet.create({})