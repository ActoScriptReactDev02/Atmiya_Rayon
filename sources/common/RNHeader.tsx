
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../theme'
import RNText from './RNText'
import RNImage from './RNImage'
import { Images } from '../constants'

const RNHeader = ({title, backarrowshow}) => {
  return (
    <View style={styles.continetstyle}>
       { !backarrowshow && <View style={[styles.imagerapstyle,{backgroundColor:Colors.Grey + '20'}]}>
         <RNImage source={Images.backarrow} style={styles.iconestyle}/>
        </View>}
     <RNText numOfLines={1} style={styles.titlestyle} children={title}/>
     <View style={[styles.imagerapstyle,{backgroundColor:Colors.Orange + '20'}]}>
        <RNImage source={Images.notification} style={styles.iconestyle}/>
     </View>
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