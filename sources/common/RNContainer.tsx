import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, wp } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const RNContainer = ({
  backgroundColor,
  children,
  style,
  translucent
 }) => {
    const styles = [{ flex: 1, backgroundColor: backgroundColor,paddingHorizontal:wp(4) }, style];

  return (
    
  <SafeAreaView  style={[{ flex: 1, backgroundColor: backgroundColor || Colors.Backgroundcolor }]} >
      <View style={styles}>
        <StatusBar
          barStyle={'default'}
          translucent={translucent ?? true}
        />
        {children}
      </View>
    </SafeAreaView>
  )
}

export default RNContainer

const styles = StyleSheet.create({})