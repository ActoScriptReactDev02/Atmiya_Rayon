import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Routes from './navigation/Routes'
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Provider } from 'react-redux'
import Store from './redux';


const App = () => {
  return (
    <KeyboardProvider  navigationBarTranslucent={true}
          statusBarTranslucent={true}
          enabled={true}>
            <Provider store={Store}>

      <Routes/>
            </Provider>
    </KeyboardProvider>
  )
}

export default App

const styles = StyleSheet.create({})