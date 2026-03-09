import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RNContainer } from '../../common'
import RNHeader from '../../common/RNHeader'
import { Images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'

const OrderDetails = () => {
  const navigtion = useNavigation()
  return (
  <RNContainer>
    <RNHeader title={'order details'} righticonesource={Images.scanner} onRightPress={() => navigtion.navigate(NavRoutes.SCAN)}/>
  </RNContainer>
  )
}

export default OrderDetails

const styles = StyleSheet.create({})