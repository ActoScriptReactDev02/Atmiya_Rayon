import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DeliveryStatus, Home, Profile } from '../../screens/PartyFlow';
import NavRoutes from '../NavRoutes';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator()


const Partynavigtion = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen component={Home} name={NavRoutes.PARTYHOME}/>
        <Stack.Screen component={Profile} name={NavRoutes.PARTYPROFILE}/>
        <Stack.Screen component={DeliveryStatus} name={NavRoutes.DELIVERYSTATUS}/>
    </Stack.Navigator>
  )
}

export default Partynavigtion

const styles = StyleSheet.create({})