import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import NavRoutes from '../NavRoutes';
import { OrderHistory } from '../../screens/DriverFlow';
const Stack = createStackNavigator()

const Drivernavigtion = () => {
  return (
     <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen component={OrderHistory} name={NavRoutes.DRIVERHOME}/>
    </Stack.Navigator>
  )
}

export default Drivernavigtion

const styles = StyleSheet.create({})