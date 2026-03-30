import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RNButton, RNContainer, RNImage, RNStyles, RNText, RnToast } from '../../common'
import RNHeader from '../../common/RNHeader'
import { Colors, FontFamily, FontSize, height, hp, normalize, width, wp } from '../../theme'
import { Images } from '../../constants'
import { DeliveryOrderModal } from '../../components/DriverFlow'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'

const ScanOrder = ({route}) => {
  const [data,setdata] = useState(route.params.Data);
  const [selctedata, setselctedata] = useState({});
  const [visible, setvisible] = useState(false);
    const [showtoast,Setshowtoast] = useState({
    isShow:false,
    message:'',
    Sucess:false,
    Title:''
  })
  const navigation = useNavigation()

  const handletoast = (v) => {
   Setshowtoast({
           isShow: true,
           Sucess: v.isSucess,
           Title: v.titles,
           message: v.messages,
         });
         setTimeout(() => {
           Setshowtoast({
             isShow: false,
             Sucess: '',
             Title: '',
             message: '',
           });
     }, 2000);
  }

  const handleonclose= () => {
    setvisible(false);
    setselctedata({});
    navigation.replace(NavRoutes.TRIPDETAILS,{TripId:route.params.TripId, IsQrScan:true})
  }
    
  return (
 <RNContainer>
    <RNHeader title={'Verify Order'}/>
   <FlatList contentContainerStyle={{rowGap:hp(2)}} data={data} renderItem={({item,index}) => (
     <Pressable onPress={() => {setselctedata(item), setvisible(true)}}  disabled={item.IsDelivered} style={[styles.card,{opacity : item.IsDelivered ? 0.6 :1, borderColor:item.IsDelivered ? Colors.Green :Colors.Orange}]}>
       <View style={{paddingBottom:hp(1)}}>
         <RNText size={FontSize.font13} family={FontFamily.SemiBold}  children={item.OrderCode}/>
         <View style={{position:'absolute', right:wp(2)}}>
          <RNImage tintColor={item.IsDelivered ? Colors.Green :Colors.Orange} source={item.IsDelivered ? Images.DeliveryDone : Images.DeliveryPending} style={{height:wp(10), width:wp(10)}}/>
         </View>
       </View>
         <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.date}/>
             <RNText numOfLines={2}  style={styles.valuetextstyle} children={item.OrderDate}/>
           </View>
            <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.loaction}/>
             <RNText numOfLines={2}  style={styles.valuetextstyle} children={item.Address + ', '+ item.Landmark + ', '+item.City+ ', '+ item.Pincode}/>
           </View>
            <View style={styles.detailswrapstyle}>
             <RNImage tintColor={Colors.Orange} style={styles.iconestyle} source={Images.cityicone}/>
             <RNText numOfLines={2}  style={styles.valuetextstyle} children={item.City+ ', '+ item.Pincode}/>
           </View>
    </Pressable>
   )}/>
   {visible && <DeliveryOrderModal tosdata={data => handletoast(data)} visible={visible} 
                     OrderUniqueIds={selctedata.OrderUniqueId} 
                     onRequestClose={() => {setvisible(false), setselctedata({})}}
                     onclose={() => handleonclose()}
    />}
    {showtoast.isShow && <RnToast  Message={showtoast.message} isSuccess={showtoast.Sucess} Title={showtoast.Title}  />}
 </RNContainer>
  )
}   

export default ScanOrder

const styles = StyleSheet.create({
    card:{
        backgroundColor: Colors.White,
        paddingHorizontal:wp(2),
        paddingVertical:hp(1),
        borderRadius:normalize(8),
        borderWidth:1
    },
      detailswrapstyle:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        columnGap:wp(1.5),
        paddingVertical:hp(0.2)
    },
    iconestyle:{
      height:wp(4),
      width:wp(4),
    },
    valuetextstyle:{
      flex:1,
      fontFamily:FontFamily.Medium,
      fontSize:FontSize.font13
    },
})