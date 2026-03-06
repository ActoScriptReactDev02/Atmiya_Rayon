import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RNButton, RNContainer, RNImage, RnLabelView, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import { useDispatch, useSelector } from 'react-redux'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../../theme'
import moment from 'moment'
import Functions from '../../utils/Functions'
import { onAuthChange, setUserDataRedux } from '../../redux/Reducers/AuthReducers'
import { LogoutModal } from '../../components'

const Profile = () => {
const {AsyncValue} = useSelector(state => state.Auth);
const dispatch = useDispatch()
const [logoutmodal,setlogoutmodal] =useState(false)

  const logoutpress = async () => {
    setlogoutmodal(false)
    await Functions.ClearValue();
     dispatch(setUserDataRedux({}));
     dispatch(onAuthChange(false));
  }
  
  return (
   <RNContainer>
    <RNHeader title={'Profile'}/>
     <View style={{paddingHorizontal:wp(2)}}>
        <View style={styles.profileimagewrapstyle}>
          <RNImage ImageUri={AsyncValue.Image} style={styles.imagestyle}/>
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
              <Pressable onPress={() => setlogoutmodal(true)} style={styles.btnstyle}>
                <RNText style={styles.btntextstyle} children={'log out'}/>
              </Pressable>
        </View>
    </View>
   {logoutmodal && <LogoutModal visible={logoutmodal} onRequestClose={() => setlogoutmodal(false)} onPress={() => logoutpress()}/>}
   </RNContainer>
  )
}

export default Profile

const styles = StyleSheet.create({
  imagestyle:{
    height:wp(22),
    width:wp(22),
    backgroundColor:'red',
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