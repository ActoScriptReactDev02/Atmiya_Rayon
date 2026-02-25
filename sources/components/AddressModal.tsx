import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, FontFamily, FontSize, height, hp, normalize, width, wp } from '../theme'
import { RNImage, RNStyles, RNText } from '../common'
import { Images } from '../constants'

const AddressModal = ({data,visible, onRequestClose, selectaddress}) => {
  return (
   <Modal  statusBarTranslucent={true} visible={visible} transparent animationType='slide'>
    <View style={styles.modalcontiner}>
        <View style={styles.modalwrapstyle}>
            <View style={[styles.modalspace,styles.modalhederstyle]}>
                <View>
                    <RNText style={styles.hedeartitlestyle} children={'Select Address'}/>
                    <RNText color={Colors.Grey} children={'Choose from saved locations'}/>
                </View>
                 <Pressable onPress={() => onRequestClose()}>
                    <RNImage source={Images.close} style={styles.iconestyle}/>
                 </Pressable>
                 </View>
                 <View style={[styles.modalspace,{paddingTop:hp(0)}]}>
           <FlatList bounces={false} contentContainerStyle={{marginBottom:hp(2)}} data={data} renderItem={({item,index}) => (
            <Pressable onPress={() => selectaddress(item)} style={styles.addressbtnstyle}>
                <View style={styles.selectedAddressIcon}>
                <RNImage tintColor={'#4CAF50'} style={{height:wp(6), width:wp(6)}} source={Images.loaction}/>
                </View>
                  <RNText style={styles.addresstextstyle} numOfLines={2} children={item.address}/>
            </Pressable>
           )}/> 
           </View>
        </View>
    </View>
   </Modal>
  )
}   

export default AddressModal

const styles = StyleSheet.create({
    modalcontiner:{
        flex:1,
        backgroundColor:'#00000056',
        justifyContent:'flex-end'
    }, modalwrapstyle:{
        maxHeight:hp(80),
        backgroundColor:Colors.White,
        borderTopLeftRadius:normalize(20),
        borderTopRightRadius:normalize(20)
    },
     modalspace:{
        paddingHorizontal:wp(4),
        paddingVertical:hp(2.2),
    },
    modalhederstyle:{
        borderBottomWidth:normalize(1),
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:Colors.BorderColor
    },
    hedeartitlestyle:{
        fontSize:FontSize.font19,
        fontFamily:FontFamily.SemiBold
    },
    iconestyle:{
        height:wp(8),
        width:wp(8),
    },
    addressbtnstyle:{
        paddingVertical:hp(2.5),
        borderBottomWidth:normalize(1),
        borderColor:Colors.BorderColor,
       flexDirection:'row',
       columnGap:wp(3)
    },
    addresstextstyle:{
        flex:1,
        fontSize:FontSize.font16
    },
      selectedAddressIcon: {
    width: wp(10),
    height: wp(10),
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#4CAF5020'
  },
})