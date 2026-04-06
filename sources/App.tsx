import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Routes from './navigation/Routes'
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Provider } from 'react-redux'
import Store from './redux';
import { NointernetModal } from './components';
import NetInfo from '@react-native-community/netinfo';



const App = () => {
const [isConnected, setIsConnected] = useState(false);
useEffect(() => {
      NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }
    });
},[])
  return (
    <KeyboardProvider  navigationBarTranslucent={true}
          statusBarTranslucent={true}
          enabled={true}>
            <Provider store={Store}>

            <Routes/>
            <NointernetModal visible={isConnected} />
            </Provider>
                 
    </KeyboardProvider>
  )
}

export default App

const styles = StyleSheet.create({})