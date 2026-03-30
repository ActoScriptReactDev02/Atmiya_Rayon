import {
  FlatList,
  Linking,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  View
} from 'react-native'

import React, { useEffect, useState, useRef } from 'react'
import Geolocation from 'react-native-geolocation-service'
import { RNContainer, RNStyles, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import { Images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'
import { OrderItemView } from '../../components/DriverFlow'
import { Colors, FontFamily, hp, wp } from '../../theme'
import FetchMethod from '../../api/FetchMethod'
import LottieView from 'lottie-react-native'

const OrderDetails = ({ route }) => {
  const navigation = useNavigation()  
  const TripId = route.params.TripId
  const [data,setdata] = useState([])
  const [isloading, setloading] = useState(false)


  useEffect(() => {
    getTrippdetails()
  },[TripId])

  const getTrippdetails = async () => {
    try{
      setloading(true);
      const response = await FetchMethod.GET({
        EndPoint:`TripMaster/GetTripSubDetails/${TripId}`
      })
      if(response.ResponseCode == 1){
        if(response.Data.length > 1){
         setdata(response.Data)
        }else{
          setdata([])
      }}else{
          setdata([])
        }
      setloading(false)
    }catch(error){
       setloading(false)
         setdata([])
      console.log('getTrippdetails error --->', error);
      
    }
  }

  return (
    <RNContainer isLoading={isloading}>
      <RNHeader
        title={'Order Details'}
      />
      <FlatList
        data={data}
        contentContainerStyle={{rowGap:hp(2), flex:!isloading && data.length == 0 ? 1 : 0}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <OrderItemView
            onPress={() => navigation.navigate(NavRoutes.TRIPDETAILS,{CustomerId:item.CustomerId, IsQrScan:route.params.IsQrScan})}
            item={item}
          />

        )}
        ListEmptyComponent={() => ( !isloading && 
        <View style={{...RNStyles.flexCenter}}>
          <LottieView autoPlay loop  style={{height:wp(60),width:wp(60)}} source={require('../../assets/Lottie/NotFound.json')}/>
          <RNText color={Colors.Orange} family={FontFamily.Medium} children={'No orders found'}/>
        </View> 
      )}
      />
    </RNContainer>
  )
}

export default OrderDetails

const styles = StyleSheet.create({})