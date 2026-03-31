import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RNImage, RNStyles, RNText } from '../../common'
import { Colors, FontFamily, FontSize, height, hp, normalize, width, wp } from '../../theme'
import { Images } from '../../constants'
import FetchMethod from '../../api/FetchMethod'

const ConfirmationModal = ({onRequestClose,OrderUniqueId,visible,toastdata,onclose}) => {
const [isloading,setisloading] = useState(false);

    const updateorder = async () => {
    try{
      setisloading(true);
    const response = await FetchMethod.POST({
            EndPoint:`Order/UpdateOrderStatus`,
            Params:{
              "OrderUniqueId": OrderUniqueId,
            }
        })
    
        if(response.ResponseCode == 0){
    toastdata({
      message:response.ResponseMessage,
        Sucess:true,
         Title:'Success'
     });
            onclose();
            setisloading(false);
        }
    }catch(error){
        //console.log('updateinvoice error -->',error);
        setisloading(false);
        onRequestClose()
         toastdata({
      message:error?.responseMSG.Message,
        Sucess:false,
         Title:'Failed'
     })
        
    }
}
  return (
   <Modal statusBarTranslucent={true} transparent visible={visible} onRequestClose={onRequestClose}>
   <View style={styles.modalcontiner}>
      <View style={styles.modalwrapstyle}>
          <RNImage tintColor={Colors.Orange} source={Images.warning} style={styles.iconestyle}/>
          <RNText style={styles.titltextstyle} children={'Are you sure?'}/>
          <RNText align={'center'} children={'Are you sure you want to finalize this order? This will mark the order as confirmed.'}/>
          <View style={styles.btnwrapstyle}>
            <Pressable onPress={() => onRequestClose()} style={[styles.btnstyle,{backgroundColor:Colors.BorderColor + 80,  borderColor:Colors.BorderColor}]}>
                <RNText color={Colors.Black} children={'Cancel'} style={styles.btntextstyle}/>
            </Pressable>
             <Pressable onPress={() => updateorder()} disabled={isloading}  style={[styles.btnstyle,{backgroundColor:Colors.Orange,borderColor:Colors.DarkBackgroundColor}]}>
                 {isloading ? <ActivityIndicator size={'small'} color={Colors.White}/> :
                    <RNText color={Colors.White} children={'Confrim'} style={styles.btntextstyle}/>}
            </Pressable>
          </View>
      </View>
   </View>
   </Modal>
  )
}

export default ConfirmationModal

const styles = StyleSheet.create({
       modalcontiner:{
       ...RNStyles.flexCenter,
       backgroundColor:'#00000050'
    },
    modalwrapstyle:{
        backgroundColor:Colors.White,
        paddingHorizontal:wp(4),
        paddingVertical:hp(2),
        width:wp(85),
        alignItems:'center',
        borderRadius:normalize(10),
    },
    iconestyle:{
        height:wp(15),
        width:wp(15)
    },
    titltextstyle:{
        fontSize:FontSize.font16,
        fontFamily:FontFamily.SemiBold,
        paddingTop:hp(1)
    },
    btntextstyle:{
        fontSize:FontSize.font13,
        fontFamily:FontFamily.Medium
    },
    btnstyle:{
        width:wp(35),
        alignItems:'center',
        paddingVertical:hp(1),
        borderRadius:normalize(5),
        borderWidth:0.5,
    },
    btnwrapstyle:{
        ...RNStyles.flexRow, 
        columnGap:wp(5),
        marginTop:hp(3)
    },
})