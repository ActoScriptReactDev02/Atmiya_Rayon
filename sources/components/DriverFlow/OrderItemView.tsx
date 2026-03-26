import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, FontSize, height, hp, normalize, width, wp } from '../../theme'
import { RNImage, RNStyles, RNText } from '../../common'
import { Images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'

const OrderItemView = ({item,onPress}) => {
 
  return (
    <Pressable onPress={onPress}  style={styles.continer}>
       <View style={[styles.headerstyle,styles.cardspace]}>
              <RNText style={styles.valuetextstyle} numOfLines={1}  children={item.OrderCode}/>
              {item.IsDelivery ?  <View style={[styles.detailswrapstyle,{alignItems:'center'}]}>
               <RNImage  style={styles.iconestyle} source={Images.doneicone}/>
                <RNText  style={styles.valuetextstyle} children={'Order Delivered'} />  </View> :
                <View style={{backgroundColor:Colors.Orange, paddingHorizontal:wp(2), borderRadius:normalize(8), paddingTop:hp(0.2), ...RNStyles.flexRow, columnGap:wp(2)}}>
                    <RNText size={FontSize.font13} color={Colors.White} children={'Start trip'}/>
                    <RNImage tintColor={Colors.White} style={{height:wp(6),width:wp(6)}} source={Images.rightback}/>
                </View>}
        </View>
        <View style={styles.cardspace}>
       <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange}  style={styles.iconestyle} source={Images.User}/>
               <RNText  style={styles.valuetextstyle} children={item.FirstName + ' ' + item.LastName}/>
         </View>
        <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange}  style={styles.iconestyle} source={Images.date}/>
               <RNText  style={styles.valuetextstyle} children={item.OrderDate}/>
         </View>
         <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange}  style={styles.iconestyle} source={Images.loaction}/>
              <RNText  style={styles.valuetextstyle} children={item.Address + ', ' + item.Landmark + ', ' + item.City+ ' ,' + item.Pincode} />
         </View>
          <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange}  style={styles.iconestyle} source={Images.cityicone}/>
              <RNText  style={styles.valuetextstyle} children={ item.City+ ' ,' + item.Pincode} />
         </View>
        {!item.IsDelivery && <View style={{...RNStyles.flexRowBetween}}>
       {item.IsOrderConfirm &&  <View style={[styles.detailswrapstyle,{alignItems:'center'}]}>
             <RNImage  style={styles.iconestyle} source={Images.doneicone}/>
              <RNText  style={styles.valuetextstyle} children={'Order Confirmed'} />
         </View>}
         {item.IsReadyforDelivery && <View style={[styles.detailswrapstyle,{alignItems:'center'}]}>
             <RNImage  style={styles.iconestyle} source={Images.doneicone}/>
              <RNText  style={styles.valuetextstyle} children={'Ready for Delivery'} />
         </View>}
         </View>}
        </View>
    </Pressable>
  )
}

export default OrderItemView

const styles = StyleSheet.create({
    continer:{
        backgroundColor:Colors.White,
        borderRadius:normalize(8),
        overflow:'hidden',
        borderWidth:normalize(1),
        borderColor:Colors.DarkBackgroundColor
    },
    detailswrapstyle:{
        flexDirection:'row',
        columnGap:wp(2),
        paddingVertical:hp(0.4)
    },
    labelstyle:{
        color:Colors.Orange,
        fontSize:FontSize.font14,
    },
    cardspace:{
    paddingVertical:hp(0.8),
    paddingHorizontal:wp(2.8),
    },
//     btnstyle: (bgcolor) =>({
// backgroundColor:bgcolor + '50',
// borderWidth:normalize(1),
// borderColor:bgcolor,
// paddingHorizontal:wp(1),
// paddingVertical:hp(0.2),
// borderRadius:normalize(5)
//     }),
//     btntextstyle: (tcolor) => ({
//        color:tcolor,
//        textAlign:'center'
//     }),
    valuetextstyle:{
    //  flex:1
    textTransform:'capitalize'
    },
     iconestyle:{
      height:wp(4),
      width:wp(4),
    },
    headerstyle:{
      ...RNStyles.flexRowBetween,
       backgroundColor:'#f8f8f8',
       borderBottomWidth:0.5,
       borderColor:Colors.BorderColor
    }
})