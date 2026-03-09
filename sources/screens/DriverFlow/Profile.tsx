import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RNContainer, RNImage, RnLabelView, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import { useDispatch, useSelector } from 'react-redux'
import Functions from '../../utils/Functions'
import { onAuthChange, setUserDataRedux } from '../../redux/Reducers/AuthReducers'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../../theme'
import moment from 'moment'

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
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
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
         <RnLabelView label={'VehicleType'} value={AsyncValue.VehicleType}/>
         <RnLabelView label={'VehicleNo'} value={AsyncValue.VehicleNo}/>
         <RnLabelView label={'Anniversary Date'} value={moment(AsyncValue.AnniversaryDate).format('LL')}/>
         <RnLabelView label={'UserType'} value={AsyncValue.UserType}/>
         <View>
            <RNText color={Colors.Grey} family={FontFamily.SemiBold} size={FontSize.font14} children={'License'}/>
            <RNImage style={styles.docImagestyle} ImageUri={'https://cms-img.coverfox.com/driving-license-gujarat.jpg'|| AsyncValue.License}/>
         </View>
              <Pressable onPress={() => setlogoutmodal(true)} style={styles.btnstyle}>
                <RNText style={styles.btntextstyle} children={'log out'}/>
              </Pressable>
        </View>
    </View>
    </ScrollView>
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
    alignItems:'center'
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
    marginTop:hp(4),
    width:wp(50),
    alignSelf:'center',
    marginBottom:hp(1)
  },
  docImagestyle:{
    width:'100%',
    height:hp(20),
    marginTop:hp(1)
  }
})