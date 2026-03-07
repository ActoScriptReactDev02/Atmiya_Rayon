import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../../theme'
import { RNImage, RNStyles, RNText } from '../../common'
import { Images } from '../../constants'

const OrderItem = ({items,onPress}) => {
  return (
    <Pressable onPress={onPress} style={[styles.card]}>
      <View style={[styles.headerstyle,styles.cardspace]}>
        <View style={styles.mainwrapstyle}>
    <RNText children={items.OrderCode} family={FontFamily.SemiBold} size={FontSize.font14}/>
    <View style={[styles.orderflagstyle,{ borderColor:items.IsReadyforDelivery ?'rgb(52 168 84)' : Colors.Red ,backgroundColor:items.IsReadyforDelivery ? 'rgba(52, 168, 85, 0.2)': Colors.Red + '20'}]}>
                 <RNText family={FontFamily.Medium} color={items.IsReadyforDelivery?'rgb(52 168 84)' : Colors.Red} size={FontSize.font11} pTop={hp(0.2)} numOfLines={1}  children={items.IsReadyforDelivery ? 'Confirm' : 'Pending'}/>
              </View>
        </View>

      </View>
      <View style={styles.cardspace}>
           <View style={styles.imagerowstyle}>
               <View style={styles.imagestyle}>
                  <RNImage ImageUri={items.OrderPhoto}/>
               </View>
              <View style={{flex:1}}>
                <View style={styles.detailswrapstyle}>
                  <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.User}/>
                   <RNText style={styles.boldtextstyle} children={items.FristName + ' ' + items.LastName}/>
                </View>
                <View style={styles.detailswrapstyle}>
                  <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.date}/>
                    <RNText size={FontSize.font12} children={items.OrderDate}/>
                </View>
                
                 <View style={[styles.detailswrapstyle,{alignItems:'flex-start'}]}>
                  <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.loaction}/>
                   <RNText style={{flex:1}} numOfLines={2} size={FontSize.font12} children={items.AddressDetails.Address + ', '+ items.AddressDetails.Landmark + ', '+items.AddressDetails.City+ ', '+ items.AddressDetails.Pincode}/>
                </View>
                 <View style={[styles.detailswrapstyle,{alignItems:'flex-start'}]}>
                  <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.cityicone}/>
                   <RNText style={{flex:1}} numOfLines={1} size={FontSize.font12} children={items.AddressDetails.City+ ', '+ items.AddressDetails.Pincode}/>
                </View>
              </View>
           </View>
         </View>
     
    </Pressable>
  )
}

export default OrderItem

const styles = StyleSheet.create({
  card:{
    backgroundColor:Colors.White,
    marginBottom:hp(2),
    borderRadius:normalize(10),
    overflow:'hidden',
    borderWidth:0.5,
    borderColor:Colors.BorderColor
  },
  cardspace:{
    paddingHorizontal:wp(2),
    paddingVertical:hp(1)
  },
  headerstyle:{
    backgroundColor:'#f9f6f6'
  },
  imagestyle:{
    // height:wp(15),
    // width:wp(15)
  width:wp(30),
  aspectRatio:1 ,
  borderRadius:normalize(10),
  overflow:'hidden'
  },
  imagerowstyle:{
   flexDirection:'row',
    columnGap:wp(2),
    paddingTop:hp(0.5)
  },
  boldtextstyle:{
    fontFamily:FontFamily.SemiBold,
    textTransform:'capitalize'
  },
  iconestyle:{
  height:wp(4),
   width:wp(4),
  },
    detailswrapstyle:{
     flexDirection: 'row',
     alignItems: 'center',
     columnGap:wp(1.5),
     paddingVertical:hp(0.2)
    },
     orderflagstyle : {
      borderWidth: 0.5,
       paddingHorizontal:wp(2), 
        borderRadius:normalize(10),
    },
    mainwrapstyle:{
      ...RNStyles.flexRowBetween
    }
})