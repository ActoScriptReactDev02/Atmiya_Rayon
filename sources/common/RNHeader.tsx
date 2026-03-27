
import { Pressable, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../theme'
import RNText from './RNText'
import RNImage from './RNImage'
import { Images } from '../constants'
import { useNavigation } from '@react-navigation/native'

const RNHeader = ({title, backarrowshow,onLeftPress,onRightPress,righticonesource}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.continetstyle}>
       { backarrowshow ? <TouchableOpacity hitSlop={15} onPress={onLeftPress}>
         <RNImage tintColor={Colors.Orange} source={Images.Profile} style={{ height:wp(7),width:wp(7)}}/>
       </TouchableOpacity> : <TouchableOpacity onPress={() => (onLeftPress ? onLeftPress?.() : navigation.goBack())} style={[styles.imagerapstyle,{backgroundColor:Colors.Grey + '20'}]}>
         <RNImage source={Images.backarrow} style={styles.iconestyle}/>
        </TouchableOpacity>}
     <RNText numOfLines={1} style={styles.titlestyle} children={title}/>
    { righticonesource ? <TouchableOpacity onPress={onRightPress} style={[styles.imagerapstyle,{backgroundColor:Colors.Orange + '20'}]}>
        <RNImage source={righticonesource } style={styles.iconestyle}/>
     </TouchableOpacity> : <View style={styles.imagerapstyle}/>}
    </View>
  )
}

export default RNHeader

const styles = StyleSheet.create({
    continetstyle:{
       // height:hp(5),
        flexDirection:'row',
       // backgroundColor:'red',
        alignItems:'center',
        marginBottom:hp(1.8),
        borderBottomWidth:0.2,
        paddingVertical:hp(1),
        borderColor:Colors.Orange
    },
    iconestyle:{
        height:wp(5),
        width:wp(5)
    },
    imagerapstyle:{
        paddingHorizontal:wp(1.3),
        paddingVertical: wp(1.3),
        borderRadius:normalize(8)
    },
    titlestyle:{flex:1,
        textAlign:'center',
        fontSize:FontSize.font16,
        fontFamily:FontFamily.SemiBold
    }
})