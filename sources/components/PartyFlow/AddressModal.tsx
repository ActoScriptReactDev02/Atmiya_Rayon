import { ActivityIndicator, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, FontFamily, FontSize, height, hp, normalize, width, wp } from '../../theme'
import { RNImage, RNStyles, RNText, RnToast } from '../../common'
import { Images } from '../../constants'
import CreateAddressModal from './CreateAddressModal'
import FetchMethod from '../../api/FetchMethod'
import { DeleleModal } from '..'
import LottieView from 'lottie-react-native'

const AddressModal = ({visible, onRequestClose, selectaddress}) => {
    const [addmodal, setaddmodal] = useState(false);
    const [addressdata, setaddressdata] = useState([]);
    const [editdata, seteditdata] = useState({});
    const [showdeletemodal, setshowdeletemodal] = useState(false);
    const [deletedata, setdeletedata] = useState({})
    const [isloading, setisloading]= useState(false)
      const [showtoast,Setshowtoast] = useState({
      isShow:false,
      message:'',
      Sucess:false,
      Title:''
    })

    useEffect(() => {
     GetUserAddress()
    },[])

  const GetUserAddress = async () => {
    try{
      setisloading(true)
      const response = await FetchMethod.GET({
        EndPoint:`UserMaster/GetUserAddress`
      })
      //console.log('response',response);
      if(response.ResponseCode == 0){
      setaddressdata(response.Data);
      }else{
        setaddressdata([])
      }
      setisloading(false)
        oncolsehandle()
    }catch(error){
      setisloading(false)
        oncolsehandle()
      console.log('GetUserAddress error -->', error);
      
    }
  }

     const handletoast = (data) => {
   Setshowtoast({
           isShow: true,
           Sucess: data.Sucess,
           Title: data.Title,
           message: data.message,
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

const handleEditdata = (data) =>{
seteditdata(data);
setaddmodal(true)
}

const handledeletebtn = (data) => {
  setshowdeletemodal(true);
  setdeletedata(data)
}

const deleteapi = async () => {
  try{
    const response = await FetchMethod.DELETE({
      EndPoint:`UserMaster/DeleteUserAddress?id=${deletedata.Id}`
    })
    if(response.success){
      handletoast({
      message:response.message,
        Sucess:true,
         Title:'Success'
     })
     GetUserAddress()
    } else {
      handletoast({
      message:response.message,
        Sucess:false,
         Title:'Success'
     })
    }
  }catch(error){
    oncolsehandle()
    console.log('deleteapi error --->', error);
    
  }
}

const oncolsehandle = () => {
  setaddmodal(false)
  seteditdata({});
  setshowdeletemodal(false)
  setdeletedata({})
}
    
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
                 <View style={[styles.modalspace,{paddingTop:hp(0),flex:1}]}>
                { isloading ? <View style={{...RNStyles.flexCenter}}>
                    <ActivityIndicator size={'large'} color={Colors.Orange}/>
                    <RNText color={Colors.Orange} family={FontFamily.Medium} children={'Loading...'} pTop={hp(1)}/>
                  </View> :
            <FlatList bounces={false} contentContainerStyle={{marginBottom:hp(2), flex: (!isloading &&addressdata.length ===0 ) ? 1 : 0}} data={addressdata} 
            renderItem={({item,index}) => (
            <Pressable onPress={() => selectaddress(item)} style={styles.addressbtnstyle}>
                  <RNImage tintColor={Colors.Orange} style={{height:wp(5), width:wp(5)}} source={Images.loaction}/>  
                  <View style={{flex:1}}>
                <View style={{...RNStyles.flexRow}}>
                  <RNText style={{flex:1}} family={FontFamily.SemiBold} numOfLines={2} children={item.AreaCodename}/>
                  <View style={styles.acttionbtnwrapstyle}>
                    <Pressable onPress={() => handleEditdata(item)} hitSlop={10}>
                        <RNImage source={Images.Edit} style={styles.actionbtniconestyle} tintColor={Colors.Blue}/>
                    </Pressable>
                    <RNText size={FontSize.font12}  children={'|'}/>
                    <Pressable onPress={() => handledeletebtn(item)} hitSlop={10}>
                        <RNImage source={Images.Delete} style={styles.actionbtniconestyle} tintColor={Colors.Red}/>
                    </Pressable>
                   </View>
                    </View>
                   <RNText family={FontFamily.Medium} style={styles.addresstextstyle} numOfLines={2} children={item.Address}/>
                   <RNText  style={styles.addresstextstyle} numOfLines={2} children={item.Location}/>
                 {item.IsDefault && <View style={{...RNStyles.flexRow, columnGap:wp(2), paddingTop:hp(0.5)}}>
                     <RNImage source={Images.successicone} style={styles.actionbtniconestyle} tintColor={Colors.Green}/>
                     <RNText size={FontSize.font12}  children={'Set as default'}/>
                  </View>}
               </View>
           </Pressable>
           )}
            ListEmptyComponent={() => ( !isloading && 
                   <View style={{...RNStyles.flexCenter}}>
                     <LottieView autoPlay loop  style={{height:wp(60),width:wp(60)}} source={require('../../assets/Lottie/NotFound.json')}/>
                     <RNText color={Colors.Orange} family={FontFamily.Medium} children={'No address found'}/>
                   </View> 
                 )}
           /> }
          
        </View>
         <Pressable style={styles.btnstyle} onPress={() => setaddmodal(true)}>
            <RNText pTop={hp(0.2)} size={FontSize.font15} family={FontFamily.SemiBold} color={Colors.Orange} children={'+ Add New Address'}/>
           </Pressable>
           </View>
    </View>
     {showtoast.isShow && <RnToast toastcontinerstyle={{ top:hp(4)}}  Message={showtoast.message} isSuccess={showtoast.Sucess} Title={showtoast.Title}  />}
     {showdeletemodal && <DeleleModal onPress={() => deleteapi()} visible={showdeletemodal} title={'Delete Address'} subcontent={'Are you sure you want to remove this address from the list?'}  onRequestClose={() => {setshowdeletemodal(false),setdeletedata({})}}/> }
    {addmodal && <CreateAddressModal Editdata={editdata} onclose={() => { GetUserAddress()}} visible={addmodal} onRequestClose={() => {setaddmodal(false),seteditdata({});}}/>}
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
      //  maxHeight:hp(80),
        backgroundColor:Colors.White,
        borderTopLeftRadius:normalize(20),
        borderTopRightRadius:normalize(20),
        height:hp(80)
    },
     modalspace:{
        paddingHorizontal:wp(4),
        paddingVertical:hp(2),
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
         paddingVertical:hp(1),
        // borderBottomWidth:normalize(1),
        borderColor:Colors.Orange,
         flexDirection:'row',
         columnGap:wp(2),
         borderWidth:0.5,
         marginTop:hp(1.5),
         paddingHorizontal:wp(1),
         borderRadius:normalize(5)
    },
    addresstextstyle:{
        flex:1,
        fontSize:FontSize.font12,
        //paddingBottom:hp(0.2)
    },
      selectedAddressIcon: {
    width: wp(10),
    height: wp(10),
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#4CAF5020'
  },
  btnstyle:{
    borderWidth:normalize(1),
    borderStyle:'dashed',
    borderColor:Colors.Orange,
    alignItems:'center',
    paddingVertical:hp(1),
    marginHorizontal:wp(5),
    marginBottom:hp(4)
  },
  acttionbtnwrapstyle:{
    flexDirection:'row',
    columnGap:wp(2),
    alignItems:'center',
    justifyContent:'flex-end'
  },
  actionbtniconestyle:{
    height:wp(4.5),
    width:wp(4.5)
  }
})