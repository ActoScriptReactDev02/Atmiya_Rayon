import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, FontSize, hp, wp, normalize } from '../../theme'
import { RNText } from '../../common'

const OrderItem = () => {
  return (
    <View style={styles.continer}>
        <View style={{flex: 1}}>
            <View style={styles.detailswrapstyle}>
             <RNText style={styles.labelstyle} children={'Item Code :'}/>
             <RNText style={styles.valuetextstyle} numOfLines={1}  children={'#12345'}/>
           </View>
           <View style={styles.detailswrapstyle}>
             <RNText style={styles.labelstyle} children={'Qty :'}/>
             <RNText  style={styles.valuetextstyle} numOfLines={1}  children={'30'}/>
           </View>
           <View style={styles.detailswrapstyle}>
             <RNText style={styles.labelstyle} children={'Address :'}/>
             <RNText  style={styles.valuetextstyle} children={'1th Floor, Gandhi Palace, Nr Jain Derasar , B/h On-Off Showroom, Timaliyawad, Nanpura - 123456'}/>
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
         columnGap:wp(2)
    },

    detailswrapstyle:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        columnGap:wp(2),
        paddingVertical:hp(0.4)
    },
    labelstyle:{
        color:Colors.Grey,
        fontSize:FontSize.font14,
        width:wp(22),
    },

    valuetextstyle:{
      flex:1
    },
})