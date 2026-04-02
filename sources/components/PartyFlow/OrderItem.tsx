import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, FontSize, hp, wp, normalize, height, width, FontFamily, isIOS } from '../../theme'
import { RNImage, RNStyles, RNText } from '../../common'
import { Images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'

const OrderItem = ({item,editPress,deletepress,orderimagepress}) => {
  const navigation = useNavigation()
  return (
    <Pressable disabled={!item.IsDelivered} onPress={() => navigation.navigate(NavRoutes.DELIVERYSTATUS,{OrderUniqueId:item.OrderUniqueId})}  style={styles.continer}>
        <View style={{flex: 1, flexDirection:'row', columnGap:wp(2)}}>
          <TouchableOpacity  onPress={orderimagepress} style={styles.imagewrapstyle}>
            <RNImage resizeMode={'cover'} ImageUri={item.OrderPhoto} style={{...RNStyles.image100,borderRadius:normalize(5)}}/>
          </TouchableOpacity>
            <View style={{flex:1}}>
            <View style={styles.titlewrapview}>
             <RNText style={styles.valuetextstyle} numOfLines={1}  children={item.OrderCode}/>
          <View style={[styles.orderflagstyle,{ 
            borderColor:item.IsDelivered ? item.Delay ? Colors.Red : Colors.Green : item.IsOrderConfirm == 'Confirm' ? Colors.Green : Colors.Red ,
            backgroundColor:(item.IsDelivered ? item.Delay ? Colors.Red : Colors.Green : item.IsOrderConfirm == 'Confirm' ? Colors.Green : Colors.Red )+ '20'
            }]}>
               <RNText family={FontFamily.Medium} 
               color={item.IsDelivered ? item.Delay ? Colors.Red : Colors.Green : item.IsOrderConfirm == 'Confirm' ? Colors.Green : Colors.Red}
                size={FontSize.font11} pTop={hp(0.2)} numOfLines={1}  
                children={item.IsDelivered ? item.Delay ? 'Delay Order' : 'Delivered' : item.IsOrderConfirm}
                />
          </View>
           </View>
             <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange}  style={styles.iconestyle} source={Images.date}/>
             <RNText  style={styles.valuetextstyle} children={item.OrderDate}/>
           </View>
            <View style={styles.detailswrapstyle}>
             <RNImage tintColor={item.IsAssignforReady == 'Not Assign' ? 'red':Colors.Orange}  style={styles.iconestyle} source={Images.driving}/>
             <RNText numOfLines={1}  family={item.IsAssignforReady == 'Not Assign' ?FontFamily.SemiBold : FontFamily.Medium} 
             color={item.IsAssignforReady == 'Not Assign' ? 'red' : Colors.Black} size={FontSize.font13} children={item.IsAssignforReady}/>
           </View>
           <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.loaction}/>
             <RNText numOfLines={2}  style={styles.valuetextstyle} children={item.AddressDetails.Address + ', '+ item.AddressDetails.Landmark + ', '+item.AddressDetails.City+ ', '+ item.AddressDetails.Pincode}/>
           </View>
             <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.cityicone}/>
             <RNText numOfLines={3}  style={styles.valuetextstyle} children={item.AddressDetails.City+ ', '+ item.AddressDetails.Pincode}/>
           </View>
          { item.IsOrderConfirm != 'Confirm' &&<View style={[styles.detailswrapstyle,{justifyContent:'flex-end'}]}>
            <Pressable onPress={editPress}>
                <RNImage tintColor={Colors.Blue} style={styles.accbtnstyle} source={Images.Edit}/>
            </Pressable>
              <RNText color={Colors.Grey} children={'|'}/>
                <Pressable onPress={deletepress}>
                  <RNImage tintColor={Colors.Red} style={styles.accbtnstyle} source={Images.Delete}/>
                </Pressable>
            </View>}
            </View>
           </View>
    </Pressable>
  )
}

export default OrderItem

const styles = StyleSheet.create({
    continer:{
        backgroundColor:Colors.White,
        paddingVertical:hp(1.2),
        paddingHorizontal:wp(2.8),
        borderRadius:normalize(8),
        flexDirection:'row',
        columnGap:wp(2),
        borderWidth:1,
        borderColor:Colors.Orange,
       // paddingBottom: isIOS ? hp(1): hp(0.5)
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
    // borderWidth:0.5,
     // borderRadius:normalize(5),
    // borderColor:Colors.BorderColor,
      height:hp(22),
      width:wp(34),
     // aspectRatio:1 ,
      alignSelf:'center' 
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
    },
    accbtnstyle:{
       height:wp(4.5),
      width:wp(4.5),
    }
    
})