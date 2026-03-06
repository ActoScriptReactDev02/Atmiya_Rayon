import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, FontSize, hp, wp, normalize, height, width, FontFamily } from '../../theme'
import { RNImage, RNStyles, RNText } from '../../common'
import { Images } from '../../constants'

const OrderItem = ({item}) => {
  return (
    <View style={styles.continer}>
        <View style={{flex: 1, flexDirection:'row', columnGap:wp(2)}}>
          <View style={styles.imagewrapstyle}>
            <RNImage ImageUri={item.OrderPhoto} style={{...RNStyles.image100}}/>
          </View>
            <View style={{flex:1}}>
            <View style={styles.titlewrapview}>
             <RNText style={styles.valuetextstyle} numOfLines={1}  children={item.OrderCode}/>
          <View style={[styles.orderflagstyle,{ borderColor:item.IsOrderConfirm == 'Confirm' ?'rgb(52 168 84)' : Colors.Red ,backgroundColor:item.IsOrderConfirm == 'Confirm' ? 'rgba(52, 168, 85, 0.2)': Colors.Red + '20'}]}>
               <RNText family={FontFamily.Medium} color={item.IsOrderConfirm == 'Confirm' ?'rgb(52 168 84)' : Colors.Red} size={FontSize.font11} pTop={hp(0.2)} numOfLines={1}  children={item.IsOrderConfirm}/>
          </View>
           </View>
             <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange}  style={styles.iconestyle} source={Images.date}/>
             <RNText  style={styles.valuetextstyle} children={item.OrderDate}/>
           </View>
            <View style={styles.detailswrapstyle}>
             <RNImage tintColor={item.IsAssignforReady == 'Not Assign' ? 'red':Colors.Orange}  style={styles.iconestyle} source={Images.driving}/>
             <RNText  family={item.IsAssignforReady == 'Not Assign' ?FontFamily.SemiBold : FontFamily.Medium} 
             color={item.IsAssignforReady == 'Not Assign' ? 'red' : Colors.Black} size={FontSize.font13} children={item.IsAssignforReady}/>
           </View>
           <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.loaction}/>
             <RNText numOfLines={3}  style={styles.valuetextstyle} children={item.Address + ', '+ item.Landmark + ', '+item.City+ ', '+ item.Pincode}/>
           </View>
             <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.cityicone}/>
             <RNText numOfLines={3}  style={styles.valuetextstyle} children={item.City+ ', '+ item.Pincode}/>
           </View>
            </View>
           </View>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
    continer:{
        backgroundColor:Colors.White,
        paddingVertical:hp(1.4),
        paddingHorizontal:wp(2.8),
        borderRadius:normalize(8),
        flexDirection:'row',
        columnGap:wp(2),
        borderWidth:1,
        borderColor:Colors.Orange
    },

    detailswrapstyle:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        columnGap:wp(1.5),
        paddingVertical:hp(0.2)
    },
    labelstyle:{
        color:Colors.Grey,
        fontSize:FontSize.font14,
      //  width:wp(22),
    },
    valuetextstyle:{
      flex:1,
      //color:Colors.Black,
      fontFamily:FontFamily.Medium,
      fontSize:FontSize.font13
    },
    imagewrapstyle:{
      borderWidth:0.5,
      borderRadius:normalize(5),
      borderColor:Colors.BorderColor,
     height:hp(20),
      width:wp(32)
    },
    iconestyle:{
      height:wp(4),
      width:wp(4),
    },
    orderflagstyle : {
      borderWidth: 0.5,
       paddingHorizontal:wp(2), 
      // borderColor:Colors.Orange,
        borderRadius:normalize(10)
    },
    titlewrapview:{
      ...RNStyles.flexRow,
      paddingBottom:hp(0.8)
    }
    
})