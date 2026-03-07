import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RNContainer, RnLabelView, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutModal } from '../../components'
import Functions from '../../utils/Functions'
import { onAuthChange, setUserDataRedux } from '../../redux/Reducers/AuthReducers'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../../theme'

const Profile = () => {
  const {AsyncValue} = useSelector(state => state.Auth);
const dispatch = useDispatch()
const [logoutmodal,setlogoutmodal] =useState(false);

const logoutpress = async () => {
    setlogoutmodal(false)
    await Functions.ClearValue();
     dispatch(setUserDataRedux({}));
     dispatch(onAuthChange(false));
  }
  return (
    <RNContainer>
      <RNHeader title={'Profile'}/>
      <ScrollView bounces={false}>
        <View style={{paddingVertical:hp(2)}}>
         <RnLabelView label={'FirstName'} value={AsyncValue.FirstName}/>
          <RnLabelView label={'LastName'} value={AsyncValue.LastName}/>
          <RnLabelView label={'MobileNo'} value={AsyncValue.MobileNo}/>
          <RnLabelView label={'EmailId'} value={AsyncValue.EmailId}/>
          <RnLabelView label={'UserName'} value={AsyncValue.UserName}/>
          <RnLabelView label={'UserType'} value={AsyncValue.UserType}/>
          
          <Pressable onPress={() => setlogoutmodal(true)} style={styles.btnstyle}>
                <RNText style={styles.btntextstyle} children={'log out'}/>
              </Pressable>
      </View>
      </ScrollView>
      {logoutmodal && <LogoutModal visible={logoutmodal} onRequestClose={() => setlogoutmodal(false)} onPress={() => logoutpress()}/>}
    </RNContainer>
  )
}

export default Profile

const styles = StyleSheet.create({
    btnstyle:{
    borderWidth:normalize(1),
    borderColor:Colors.Red,
    borderRadius:normalize(5),
    paddingVertical:hp(0.8),
    backgroundColor:Colors.Red + '20',
    marginTop:hp(5),
    width:wp(50),
    alignSelf:'center'
  },
    btntextstyle:{
    color:Colors.Red,
    fontFamily:FontFamily.SemiBold,
    fontSize:FontSize.font15,
    textTransform:'capitalize',
    textAlign:'center'
  },
})