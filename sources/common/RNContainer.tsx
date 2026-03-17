import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, wp } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNLoader from './RNLoader';

const RNContainer = ({
  backgroundColor,
  children,
  style,
  translucent,
  isLoading = false,
 }) => {
    const styles = [{ flex: 1, backgroundColor: backgroundColor,paddingHorizontal:wp(4) }, style];

  return (
    
  <SafeAreaView  style={[{ flex: 1, backgroundColor: backgroundColor || Colors.Backgroundcolor }]} >
    {isLoading && <RNLoader visible={isLoading}/>}
      <View style={styles}>
        <StatusBar
          barStyle={'dark-content'}
          translucent={translucent ?? true}
          backgroundColor={Colors.DarkBackgroundColor}
        />
        {children}
      </View>
    </SafeAreaView>
  )
}

export default RNContainer

const styles = StyleSheet.create({})