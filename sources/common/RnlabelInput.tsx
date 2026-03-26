import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RNText from './RNText'
import RNInput from './RNInput'
import RNStyles from './RNStyles'
import { Colors, FontFamily, hp, wp } from '../theme'

const RnlabelInput = ({labeltitle,placeholder,value,onChangeText,error,errormessage,keyboardType,maxLength}) => {
  return (
   <View>
                    <View style={{...RNStyles.flexRow, columnGap:wp(2), paddingBottom:hp(0.5)}}>
                        <RNText style={styles.labelstyle} children={labeltitle}/>
                        <RNText color={Colors.Red} children={'*'}/>
                    </View>
                    <RNInput 
                    placeholder={placeholder} 
                    containerStyle={styles.In_containerStyle}
                    value={value}
                    onChangeText={onChangeText}
                    error={error}
                    errormessage={errormessage}
                    keyboardType={keyboardType} 
                    maxLength={maxLength}/>
                </View>
  )
}

export default RnlabelInput

const styles = StyleSheet.create({
    In_containerStyle:{
        borderWidth:1,
        borderColor:Colors.BorderColor,
        height: hp(5),
    },
    labelstyle:{
        fontFamily:FontFamily.Medium
    },
})