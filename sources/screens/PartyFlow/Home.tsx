import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RNContainer } from '../../common'
import RNHeader from '../../common/RNHeader'
import { AddOrderModal, OrderItemView } from '../../components'
import LottieView from 'lottie-react-native'
import { hp, wp } from '../../theme'

const Home = () => {
  const [ordermodal, setordermodal] = useState(false)
  return (
   <RNContainer>
    <RNHeader backarrowshow={true}  title={'Order History'}/>
    <View>
      <OrderItemView/>
    </View>
   <Pressable onPress={() => setordermodal(true)} style={styles.addbtnstyle}>
     <LottieView autoPlay loop  style={styles.btnstyle} source={require('../../assets/Lottie/AddDetlis.json')}/>
   </Pressable>
      {ordermodal &&<AddOrderModal visible={ordermodal} onRequestClose={()=> setordermodal(false)}/>}
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
  }
})