import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Authroutes from './Authroutes'
import { NavigationContainer } from '@react-navigation/native';
import PartyDrawernavigtion from './PartyDrawer';
import { useSelector } from 'react-redux';

const Routes = () => {
  const  {isAuth} = useSelector(state => state.Auth)
  return (
    <NavigationContainer>
     { isAuth ? <PartyDrawernavigtion/>:<Authroutes/>
      }
    </NavigationContainer>
  )
}

export default Routes

const styles = StyleSheet.create({})