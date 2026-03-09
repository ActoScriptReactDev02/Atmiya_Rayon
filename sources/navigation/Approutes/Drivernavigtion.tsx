import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import NavRoutes from '../NavRoutes';
import { Orderdetails, OrderHistory, Profile, Scan } from '../../screens/DriverFlow';
const Stack = createStackNavigator()

const Drivernavigtion = () => {
  return (
     <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen component={OrderHistory} name={NavRoutes.DRIVERHOME}/>
         <Stack.Screen component={Profile} name={NavRoutes.DRIVERPROFILE}/>
        <Stack.Screen component={Orderdetails} name={NavRoutes.DRIVERORDERDETAILS}/>
         <Stack.Screen component={Scan} name={NavRoutes.SCAN}/>
    </Stack.Navigator>
  )
}

export default Drivernavigtion

const styles = StyleSheet.create({})