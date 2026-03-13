import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { OrderDetails, OrderHistory, Profile } from '../../screens/TeamMemberFlow';
import NavRoutes from '../NavRoutes';
const Stack = createStackNavigator()

const TeamMembernavigtion = () => {
  return (
     <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen component={OrderHistory} name={NavRoutes.TEAMHOME}/>
        <Stack.Screen component={Profile} name={NavRoutes.TEAMPROFILE}/>
        <Stack.Screen component={OrderDetails} name={NavRoutes.TEAMORDERDETAILS}/>
    </Stack.Navigator>
  )
}

export default TeamMembernavigtion

const styles = StyleSheet.create({})