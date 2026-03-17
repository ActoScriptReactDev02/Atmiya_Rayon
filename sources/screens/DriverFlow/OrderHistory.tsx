import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RNContainer, RNImage, RNStyles, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import FetchMethod from '../../api/FetchMethod'
import { OrderItemView } from '../../components/DriverFlow'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'
import { Colors, FontSize, hp, normalize, wp } from '../../theme'
import { Images } from '../../constants'

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
      <FlatList contentContainerStyle={{rowGap:hp(2)}} bounces={false} data={data} 
      renderItem={({item,index}) => (
       <Pressable onPress={() => navigation.navigate(NavRoutes.DRIVERORDERDETAILS,{Data:item.TripDetails})} style={styles.crad}>
        <View style={styles.detailswrapstyle}>
             <RNText style={styles.labelstyle} children={'Trip Code :'}/>
             <RNText style={styles.valuetextstyle} numOfLines={1}  children={item.TripCode}/>
        </View>
              <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange}  style={styles.iconestyle} source={Images.date}/>
             <RNText  style={styles.valuetextstyle} children={item.CreatedDate}/>
           </View>
       </Pressable>
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