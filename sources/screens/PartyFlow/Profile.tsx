import { Alert, Linking, Modal, PermissionsAndroid, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { RNButton, RNContainer, RNImage, RnLabelView, RNStyles, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import { useDispatch, useSelector } from 'react-redux'
import { Colors, FontFamily, FontSize, height, hp, normalize, width, wp } from '../../theme'
import moment from 'moment'
import Functions from '../../utils/Functions'
import { onAuthChange, setUserDataRedux } from '../../redux/Reducers/AuthReducers'
import { LogoutModal } from '../../components'
import QRCode from 'react-native-qrcode-svg'
import { Images } from '../../constants'

const Profile = () => {
const {AsyncValue} = useSelector(state => state.Auth);
const dispatch = useDispatch()
const [logoutmodal,setlogoutmodal] =useState(false);
const [showqrcode, setshowqrcode] = useState(false)
  const qrRef = useRef();

  const logoutpress = async () => {
    setlogoutmodal(false)
    await Functions.ClearValue();
     dispatch(setUserDataRedux({}));
     dispatch(onAuthChange(false));
  }

  
  return (
   <RNContainer>
    <RNHeader title={'Profile'} righticonesource={Images.scanner} onRightPress={() => setshowqrcode(true)}/>
    <ScrollView bounces={false}>
     <View style={{paddingHorizontal:wp(2)}}>
        <View style={styles.profileimagewrapstyle}>
          <RNImage resizeMode={'cover'} ImageUri={'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D'||AsyncValue.Image} style={styles.imagestyle}/>
          <RNText style={styles.titlestyle} children={AsyncValue.FirstName + ' ' + AsyncValue.LastName}/>
          <RNText pTop={hp(0.5)} children={AsyncValue.MobileNo}/>
        </View>
        <View style={{paddingTop:hp(2)}}>
             
         <RnLabelView label={'Code'} value={AsyncValue.CustomerCode}/>
           <RnLabelView label={'Email Id'} value={AsyncValue.EmailId}/>
            <RnLabelView label={'Gender'} value={AsyncValue.Gender}/>
            <RnLabelView label={'Birth Date'} value={moment(AsyncValue.BirthDate).format('LL')}/>
             <RnLabelView label={'Anniversary Date'} value={moment(AsyncValue.AnniversaryDate).format('LL')}/>
              <RnLabelView label={'UserType'} value={AsyncValue.UserType}/>
             {/* <View style={{alignSelf:'center', paddingVertical:hp(2)}}>
               <QRCode
                      value={AsyncValue.CustomerId}
                      size={hp(18)}
                      color={Colors.Black}
                      backgroundColor={Colors.White}
                    />
             </View> */}
              <Pressable onPress={() => setlogoutmodal(true)} style={styles.btnstyle}>
                <RNText style={styles.btntextstyle} children={'log out'}/>
              </Pressable>
        </View>
    </View>
    </ScrollView>
   {logoutmodal && <LogoutModal visible={logoutmodal} onRequestClose={() => setlogoutmodal(false)} onPress={() => logoutpress()}/>}
    <Modal statusBarTranslucent={true} visible={showqrcode} onRequestClose={() => setshowqrcode(false)}>
      <View style={{ paddingHorizontal:wp(4),flex:1, paddingTop:hp(8), backgroundColor:Colors.DarkBackgroundColor}}>
         <Pressable hitSlop={10} onPress={() => setshowqrcode(false)}>
          <RNImage source={Images.backarrow} style={{height:wp(7), width:wp(7)}}/>
         </Pressable>
        <View style={{...RNStyles.flexCenter,}}>
        <RNText align={'center'} family={FontFamily.SemiBold} size={FontSize.font16}  color={Colors.Black} children={'Your QR Code is Ready! Download it now — the driver will scan it at pickup.'}/>
        <View style={{paddingVertical:hp(7)}}>
         <QRCode      getRef={(ref) => (qrRef.current = ref)}
                      value={AsyncValue.CustomerId}
                      size={hp(30)}
                      color={Colors.White}
                      backgroundColor={Colors.Black}
           />
           </View>
            <RNButton title={'Download QR Code'} />
            </View>
      </View>
    </Modal>
   </RNContainer>
  )
}

export default Profile

const styles = StyleSheet.create({
  imagestyle:{
    height:wp(22),
    width:wp(22),
    borderRadius:normalize(50)
  },
  profileimagewrapstyle:{
    alignSelf:'center'
  },
  titlestyle:{
    color:Colors.Orange,
    fontFamily:FontFamily.SemiBold,
    fontSize:FontSize.font17,
    paddingTop:hp(1),
    textTransform:'capitalize'
  },
  btntextstyle:{
    color:Colors.Red,
    fontFamily:FontFamily.SemiBold,
    fontSize:FontSize.font15,
    textTransform:'capitalize',
    textAlign:'center'
  },
  btnstyle:{
    borderWidth:normalize(1),
    borderColor:Colors.Red,
    borderRadius:normalize(5),
    paddingVertical:hp(0.8),
    backgroundColor:Colors.Red + '20',
    marginTop:hp(3),
    width:wp(50),
    alignSelf:'center'
  }
 
  
})