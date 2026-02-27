import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../../screens/PartyFlow';
import NavRoutes from '../NavRoutes';
import OrderQRCode from '../../screens/PartyFlow/OrderQRCode';
const Drawer= createDrawerNavigator()

const PartyDrawernavigtion = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown:false}}>
        <Drawer.Screen component={OrderQRCode} name={NavRoutes.QRCODE}/>
    </Drawer.Navigator>
  )
}

export default PartyDrawernavigtion

const styles = StyleSheet.create({})