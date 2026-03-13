import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Authroutes from './Authroutes'
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Splash } from '../screens/Auth';
import Approutes from './Approutes';
import Functions from '../utils/Functions';
import { onAuthChange, setUserDataRedux } from '../redux/Reducers/AuthReducers';

const Routes = () => {
  const  {isAuth,AsyncValue} = useSelector(state => state.Auth);
  const [isLoading, SetisLoading] =  useState(true);
   const distpatch = useDispatch()

   useEffect(() =>{
    userdatahandle()
   },[])

const userdatahandle = async () => {
    try{
       SetisLoading(true);
       const data = await Functions.getUserData();
       if(data != null && Object.keys(data).length > 0 && data != '') {
         distpatch(setUserDataRedux(data))
         distpatch(onAuthChange(true))
       }else{
        distpatch(onAuthChange(false))
       }
       SetisLoading(false);
    }catch(error){
       SetisLoading(false)
      //console.log('Routes data error -->', error);
      
    }
  }

  if(isLoading) return<Splash/>;

  return (
    <NavigationContainer>
     { isAuth ? <Approutes type={AsyncValue.UserType}/>:<Authroutes/>}
    </NavigationContainer>
  )
}

export default Routes

const styles = StyleSheet.create({})