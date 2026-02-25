import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RNButton, RNContainer, RnImagesCard, RNInput, RNStyles, RNText } from '../../common'
import { Images } from '../../constants'
import { Colors, FontFamily, FontSize, hp } from '../../theme'
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useDispatch } from 'react-redux'
import { onAuthChange } from '../../redux/Reducers/AuthReducers'


const Login = () => {
  const [state, setstate] = useState({
    username:'',
    password:''
  })
  const distpatch = useDispatch()
  const [secureText, SetsecureText] = useState(true);
  const [isnavigate, setisnavigate] = useState(false);
const nameerror = isnavigate && state.username.length < 2;
const passworderror = isnavigate && state.password.length < 6
  const handlelogin = () => {
    setisnavigate(true);
    distpatch(onAuthChange(true))
  }
  
  return (
   <RNContainer>
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
   <View style={styles.continer}>
    <View style={{...RNStyles.center}}>
    <RnImagesCard source={Images.Logo}/>
    <View style={styles.textsontinerstyle}>
      <RNText style={styles.titlestyle} children={'WELCOME TO ATMIYA RAYON'}/>
        <RNText style={styles.subcontentstyle} children={'Please Login To Your Account'}/>
    </View>
    </View>
    <View style={styles.inputwrapstyle}>
      <RNInput errormessage={'** Please enter a valid name.'} error={nameerror} value={state.username} onChangeText={v => setstate(p => ({...p, username:v}))} leftIconSource={Images.User} placeholder={'ID / Username'}/>
      <RNInput errormessage={'** Please enter a password with at least 6 characters..'} error={passworderror} rightIconPress={() => SetsecureText(!secureText)} secureTextEntry={secureText} rightIconSource={secureText ? Images.pw_hide: Images.pw_show} value={state.password} onChangeText={v => setstate(p => ({...p, password:v}))} leftIconSource={Images.pwicon} placeholder={'Password'}/>
    </View>
    <RNButton onPress={() => handlelogin()} title={'Sign In'}/>
   </View>
   </KeyboardAwareScrollView>
   </RNContainer>
  )
}

export default Login

const styles = StyleSheet.create({
  continer:{
    ...RNStyles.flexCenter,
  },
  textsontinerstyle:{
    alignItems:'center',
    paddingTop:hp(2)
  },
  titlestyle:{
    fontSize:FontSize.font16,
    fontFamily:FontFamily.SemiBold,
    paddingBottom:hp(0.8)
  },
  subcontentstyle:{
    color:Colors.Grey,
    fontSize:FontSize.font12
  },
  inputwrapstyle:{
    width:'100%',
    paddingVertical:hp(4)
  }
})