import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RNContainer, RNImage, RNStyles, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import FetchMethod from '../../api/FetchMethod'
import { OrderItemView } from '../../components/DriverFlow'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../../theme'
import { Images } from '../../constants'
import LottieView from 'lottie-react-native'

const OrderHistory = () => {
  const [data, setdata] = useState([])
  const [isloading, setisloading] = useState(false)
  const navigation = useNavigation()
     const [refreshing, setRefreshing] = useState(false);
  

useEffect(() => {
 GetTripDetails()
},[])

  const GetTripDetails = async () => {
    try{
      setisloading(true)
     const response = await FetchMethod.GET({
      EndPoint:`TripMaster/GetTripDetails`
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

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await GetTripDetails(); 
    } catch (e) {
      console.log(e);
    }
    setRefreshing(false);
  };

  return (
   <RNContainer isLoading={isloading}>
    <RNHeader onLeftPress={() => navigation.navigate(NavRoutes.DRIVERPROFILE)} backarrowshow={true} title={'Order History'}/>
    <View style={{flex:1}}>
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
       contentContainerStyle={{rowGap:hp(2), flexGrow:1}} data={data} 
      renderItem={({item,index}) => (
       <Pressable onPress={() => navigation.navigate(NavRoutes.DRIVERORDERDETAILS,{Data:item.TripDetails,IsQrScan:item.IsQrScan})} style={styles.crad}>
        <View style={styles.detailswrapstyle}>
             {/* <RNText style={styles.labelstyle} children={'Trip Code :'}/> */}
             <RNText style={styles.valuetextstyle} numOfLines={1}  children={item.TripCode}/>
            {/* {item.Delay && <View style={{ ...RNStyles.flexRow,columnGap:wp(2),}} >
             <RNImage tintColor={item.Delay ? Colors.Red : Colors.Green}  style={styles.iconestyle} source={Images.dealy}/>
             <RNText size={FontSize.font13} color={item.Delay ? Colors.Red : Colors.Green} children={item.Delay ? 'Delay Order' : 'Delivered On Time'}/>
           </View>} */}
        </View>
            <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange}  style={styles.iconestyle} source={Images.date}/>
             <RNText  style={styles.valuetextstyle} children={item.CreatedDate}/>
           </View>
           
       </Pressable>
      )}
       ListEmptyComponent={() => ( !isloading && 
        <View style={{...RNStyles.flexCenter}}>
          <LottieView autoPlay loop  style={{height:wp(60),width:wp(60)}} source={require('../../assets/Lottie/NotFound.json')}/>
          <RNText color={Colors.Orange} family={FontFamily.Medium} children={'No orders found'}/>
        </View> 
      )}
      />
    </View>
   </RNContainer>
  )
}

export default OrderHistory

const styles = StyleSheet.create({
  crad:{
   backgroundColor:Colors.White,
   paddingVertical:hp(1.4),
   paddingHorizontal:wp(2.8),
   borderRadius:normalize(8),
  },
     detailswrapstyle:{
        ...RNStyles.flexRow,
        columnGap:wp(2),
        paddingVertical:hp(0.4)
    },
    labelstyle:{
        color:Colors.Grey,
        fontSize:FontSize.font14,
        width:wp(22)
    },
     valuetextstyle:{
      flex:1
    },
        iconestyle:{
      height:wp(4),
      width:wp(4),
    },
})