import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, FontSize, hp, normalize, wp } from '../theme'
import { RNImage, RNStyles, RNText } from '../common'
import { Images } from '../constants'

const OrderItemView = () => {
  return (
    <View style={styles.continer}>
        <View style={{ flex:1}}>
           <View style={styles.detailswrapstyle}>
             <RNText style={styles.labelstyle} children={'Item Code :'}/>
             <RNText style={styles.valuetextstyle} numOfLines={1}  children={'#12345'}/>
           </View>
            <View style={styles.detailswrapstyle}>
             <RNText style={styles.labelstyle} children={'Qty :'}/>
             <RNText  style={styles.valuetextstyle} numOfLines={1}  children={'30'}/>
           </View>
           <View style={styles.detailswrapstyle}>
             <RNText style={styles.labelstyle} children={'Amount :'}/>
             <RNText  style={styles.valuetextstyle} numOfLines={1}  children={'₹30,000'}/>
           </View>
           </View>
           <View>
            <View style={{rowGap:hp(3), alignItems:'center'}}>
              <Pressable style={styles.btnstyle('#0F7FC4')}>
                <RNText style={styles.btntextstyle('#0F7FC4')} children={'Dispatched'}/>
              </Pressable>
               {/* <Pressable style={styles.btnstyle('#C48B0F')}>
                <RNText style={styles.btntextstyle('#C48B0F')} children={'Preparing'}/>
              </Pressable> */}
              <RNImage source={Images.mapicon} style={styles.iconestyle}/>
            </View>
          </View>
    </View>
  )
}

export default OrderItemView

const styles = StyleSheet.create({
    continer:{
        backgroundColor:Colors.White,
        paddingVertical:hp(1.4),
        paddingHorizontal:wp(2.8),
        borderRadius:normalize(8),
        flexDirection:'row',
         columnGap:wp(2)
    },
    detailswrapstyle:{
        ...RNStyles.flexRow,
        columnGap:wp(2),
        paddingVertical:hp(0.4)
    },
    labelstyle:{
        color:Colors.Grey,
        fontSize:FontSize.font14,
        width:wp(22)
    },
    btnstyle: (bgcolor) =>({
backgroundColor:bgcolor + '50',
borderWidth:normalize(1),
borderColor:bgcolor,
paddingHorizontal:wp(1),
paddingVertical:hp(0.2),
borderRadius:normalize(5)
    }),
    btntextstyle: (tcolor) => ({
       color:tcolor,
       textAlign:'center'
    }),
    valuetextstyle:{
      flex:1
    },
    iconestyle:{
      height:wp(6),
      width:wp(6)
    }
})