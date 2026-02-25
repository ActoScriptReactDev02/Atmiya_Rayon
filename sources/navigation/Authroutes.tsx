import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import NavRoutes from './NavRoutes';
import { Login } from '../screens/Auth';

const Stack = createStackNavigator()

const Authroutes = () => {
  return (
<Stack.Navigator screenOptions={{headerShown:false}}>
  <Stack.Screen name={NavRoutes.LOGIN} component={Login}/>
</Stack.Navigator>
  )
}

export default Authroutes

const styles = StyleSheet.create({})