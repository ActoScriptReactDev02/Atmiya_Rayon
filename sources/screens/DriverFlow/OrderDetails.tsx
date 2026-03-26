import {
  FlatList,
  Linking,
  StyleSheet,
  PermissionsAndroid,
  Platform
} from 'react-native'

import React, { useEffect, useState, useRef } from 'react'
import Geolocation from 'react-native-geolocation-service'
import { RNContainer } from '../../common'
import RNHeader from '../../common/RNHeader'
import { Images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'
import { OrderItemView } from '../../components/DriverFlow'
import { hp } from '../../theme'

const OrderDetails = ({ route }) => {
  const navigation = useNavigation()  
  const data = route.params.Data

  return (

    <RNContainer>
      <RNHeader
        title={'Order Details'}
      />

      <FlatList
        data={data}
        contentContainerStyle={{rowGap:hp(2)}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <OrderItemView
            onPress={() => navigation.navigate(NavRoutes.TRIPDETAILS,{CustomerId:item.CustomerId, IsQrScan:route.params.IsQrScan})}
            item={item}
          />

        )}
      />

    </RNContainer>

  )

}

export default OrderDetails

const styles = StyleSheet.create({})