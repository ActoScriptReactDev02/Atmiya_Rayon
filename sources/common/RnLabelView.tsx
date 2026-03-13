import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, FontFamily, FontSize, hp, normalize } from '../theme'
import RNText from './RNText'

const RnLabelView = ({label, value}) => {
  return (
     <View style={styles.detliswrapstyle}>
            <RNText style={styles.labelstyle} children={label}/>
            <RNText style={styles.valuestyle} children={value}/>
    </View>
  )
}

export default RnLabelView

const styles = StyleSheet.create({
    detliswrapstyle:{
    borderBottomWidth:normalize(1),
    borderColor:Colors.DarkBackgroundColor,
    paddingBottom:hp(1),
    marginBottom:hp(2)
  },
    labelstyle:{
    fontSize:FontSize.font14,
    color:Colors.Grey,
    fontFamily:FontFamily.SemiBold,
     textTransform:'capitalize'
  },
  valuestyle:{
    fontSize:FontSize.font14,
    paddingTop:hp(0.3),
    color:Colors.Orange,
    fontFamily:FontFamily.SemiBold,
  },
})