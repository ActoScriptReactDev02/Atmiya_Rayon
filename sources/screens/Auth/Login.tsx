import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RNButton, RNContainer, RnImagesCard, RNInput, RNStyles, RNText, RnToast } from '../../common'
import { Images } from '../../constants'
import { Colors, FontFamily, FontSize, hp } from '../../theme'
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useDispatch } from 'react-redux'
import { onAuthChange, setUserDataRedux } from '../../redux/Reducers/AuthReducers'
import FetchMethod from '../../api/FetchMethod'
import Functions from '../../utils/Functions'


const Login = () => {
  const [state, setstate] = useState({  
    username:'',
    password:''
  })
  const distpatch = useDispatch()
  const [secureText, SetsecureText] = useState(true);
  const [isnavigate, setisnavigate] = useState(false);
  const [isLoading, SetisLoading] = useState(false);
  const [showtoast,Setshowtoast] = useState({
    isShow:false,
    message:'',
    Sucess:false,
    Title:''
  })
const nameerror = isnavigate && state.username.length < 2;
const passworderror = isnavigate && state.password.length < 4
const isvalid = isnavigate && state.password.length >4 && state.username.length > 2


  const handlelogin = async () => {
    try{
      setisnavigate(true);
      if(isvalid){
        SetisLoading(true);
      const response = await FetchMethod.POST({
        EndPoint:'Login',
        Params:{
              "UserName": state.username,
              "Password": state.password
       }
      });
      
      if(response.ResponseCode == 0){
        await Functions.setUserData(response);
        distpatch(setUserDataRedux(response));
        distpatch(onAuthChange(true));
        handletoast(response.ResponseMessage,true,'Success')
      } else{
        distpatch(onAuthChange(false))
          handletoast(response.ResponseMessage,false,'Success')
      }
    }
     SetisLoading(false);
  }catch(error){
    //console.log('Login api error --->',error);
     SetisLoading(false);
        if(error.responseMSG.Message){
          handletoast(error?.responseMSG.Message,false,'Login failed.')
        }
     }
  }



  const handletoast = (messge,issuccess,title) => {
   //console.log('data',messge,issuccess,title);
      Setshowtoast({
              isShow: true,
              Sucess: issuccess,
              Title: title,
              message: messge,
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
  
  return (
   <RNContainer isLoading={isLoading}>
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
   <View style={styles.continer}>
    <View style={{...RNStyles.center}}>
    <RnImagesCard source={Images.Logo}/>
    <View style={styles.textsontinerstyle}>
      <RNText style={styles.titlestyle} children={'WELCOME TO AATMIYA RAYON'}/>
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
   {showtoast.isShow && <RnToast Message={showtoast.message} isSuccess={showtoast.Sucess} Title={showtoast.Title}/>}
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