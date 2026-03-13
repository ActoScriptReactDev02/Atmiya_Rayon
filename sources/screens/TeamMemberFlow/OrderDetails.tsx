import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RNContainer, RNImage, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import { hp } from '../../theme'

const OrderDetails = ({route}) => {
  const orderitem  = route.params.data

  return (
   <RNContainer>
    <RNHeader/>
    <View>
      <RNImage ImageUri={orderitem.OrderPhoto} style={styles.imagestyle}/>
    </View>
   </RNContainer>
  )
}

export default OrderDetails

const styles = StyleSheet.create({
  imagestyle: {
  height: hp(50),
  width: '100%',
  //backgroundColor: 'red',
  resizeMode: 'contain'
}
})