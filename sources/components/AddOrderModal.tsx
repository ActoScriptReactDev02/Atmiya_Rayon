import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, FontFamily, FontSize, height, hp, normalize, width, wp } from '../theme'
import { RNButton, RNImage, RNStyles, RNText } from '../common'
import { Images } from '../constants'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import ImagePicker from "react-native-image-crop-picker";
import AddressModal from './AddressModal'

const AddOrderModal = ({visible, onRequestClose}) => {
    const addressOptions = [
    { 
      id: '1', 
      address: 'Office No. T8-11, Nilkanth Business Hub Besides D-Mart Singanpore, Causeway Rd, Katargam, Surat',
    },
    { 
      id: '2', 
      address: '456 Business Avenue, New York, NY 10002',
    },
    { 
      id: '3', 
      address: '789 Fitness Boulevard, New York, NY 10003',
    },
    { 
      id: '4', 
      address: '321 Education Road, New York, NY 10004',
    },
    { 
      id: '5', 
      address: '654 Food Street, New York, NY 10005',
    },
  ];
    const [datepicker, setdatepicker]= useState(false);
    const [addrssmodal, setaddrssmodal] = useState(false);
    const [selectAddress, setselectAddress] = useState(addressOptions[0])
    const [state, setstate] = useState({
        date:new Date(),
        imagedata:{
            uri:'',
            base64:''
        },
        address:''
    })

const handlegellary  = () => {
ImagePicker.openPicker({
//   width: 500,
//   height: 400,
  cropping: true,
  includeBase64:true
}).then((image) => {
  setstate(p => ({...p, imagedata:{uri:image.path, base64:image.data}}))
});
}

const handlecamara = () => {
    ImagePicker.openCamera({
  width: 300,
  height: 400,
  cropping: true,
}).then((image) => {
  setstate(p => ({...p, imagedata:{uri:image.path, base64:image.data}}))
})}


  return (
    <Modal  statusBarTranslucent={true} visible={visible} transparent animationType='slide'>
        <View style={styles.modalcontiner}>
         <View style={styles.modalwrapstyle}>
              <View style={[styles.modalspace,styles.modalhederstyle]}>
                <View>
                    <RNText style={styles.hedeartitlestyle} children={'Add Order'}/>
                    <RNText color={Colors.Grey} children={'Fill in the details below'}/>
                </View>
                <Pressable onPress={() => onRequestClose()}>
                    <RNImage source={Images.close} style={styles.iconestyle}/>
                </Pressable>
              </View>
              <ScrollView>
              <View style={styles.modalspace}>
                   <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <RNImage tintColor={'#FF6B6B'} style={styles.cardiconestyle} source={Images.date}/>
                        <RNText children={'Date'} style={styles.cardTitle}/>
                        <RNText children={'*'} style={styles.requiredStar}/>
                    </View>
                    <TouchableOpacity onPress={() => setdatepicker(true)} style={styles.dateSelector} >
                        <RNImage style={{height:wp(6), width:wp(6)}} source={Images.calendar}/>
                        <RNText style={styles.dateText} children={moment(state.date).format('LL')}/>
                    </TouchableOpacity>
                   </View>
                   <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <RNImage tintColor={Colors.Blue} style={styles.cardiconestyle} source={Images.camera}/>
                        <RNText children={'Photo'} style={styles.cardTitle}/>
                        <RNText children={'*'} style={styles.requiredStar}/>
                    </View>
                    {state.imagedata.uri !='' ? <View style={styles.photoPreviewContainer}>
                   <RNImage ImageUri={state.imagedata.uri}  style={styles.photoPreview} />
                    <TouchableOpacity
                      style={styles.changePhotoButton}
                      onPress={() => 
                        setstate(p => ({...p, imagedata:{uri:'', base64:''}}))
                      }>
                     <RNImage tintColor={Colors.White} style={styles.cardiconestyle} source={Images.Edit}/>
                      <RNText children={'Change Photo'} style={styles.changePhotoText}/>
                    </TouchableOpacity>
                  </View> :
                 <View style={styles.photoOptions}>
                    <TouchableOpacity onPress={()=> handlecamara()}
                      style={[styles.photoOption, styles.cameraOption]} 
                      >
                      <RNImage tintColor={Colors.White} style={styles.cardiconestyle} source={Images.camera}/>
                      <RNText children={'Take Photo'} style={styles.photoOptionText}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => handlegellary()}
                      style={[styles.photoOption, styles.galleryOption]} 
                     >
                       <RNImage tintColor={Colors.White} style={styles.cardiconestyle} source={Images.gallery}/>
                      <RNText children={'Choose from Gallery'} style={styles.photoOptionText}/>
                    </TouchableOpacity>
                  </View>}
                   </View>
                   <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <RNImage tintColor={'#45B7D1'} style={styles.cardiconestyle} source={Images.loaction}/>
                        <RNText children={'Address'} style={styles.cardTitle}/>
                        <RNText children={'*'} style={styles.requiredStar}/>
                    </View>
                    <TouchableOpacity style={styles.dateSelector}  onPress={() => setaddrssmodal(true)}>
                        <View style={styles.selectedAddressIcon}>
                            <RNImage tintColor={'#4CAF50'} style={{height:wp(6), width:wp(6)}} source={Images.loaction}/>
                        </View>
                       <View style={{...RNStyles.flexRow, flex:1, columnGap:wp(1)}}>
                         <RNText numOfLines={3} style={styles.addresstext} children={selectAddress.address}/>
                         <RNImage tintColor={Colors.Grey} style={{height:wp(4), width:wp(4),transform: [
                          {
                            rotate:'180deg',
                          },
                        ],}} source={Images.backarrow}/>
                       </View>
                    </TouchableOpacity>
                   </View>
                    <RNButton btnstyles={{marginTop:hp(0), marginBottom: hp(2)}} title={'Save'}/>
              </View>
              </ScrollView>
         </View>
       {datepicker && <DateTimePickerModal  isVisible={datepicker}  mode='date' value={state.date.toISOString()} 
       onCancel={() => setdatepicker(false)}
       onConfirm={(v) => {setstate(p => ({...p, date:v})), setdatepicker(false)}}
       />}
       {addrssmodal && <AddressModal selectaddress={(data) => {setselectAddress(data), setaddrssmodal(false)} } onRequestClose={() => setaddrssmodal(false)} visible={addrssmodal} data={addressOptions}/>}
        </View>
    </Modal>
  )
}

export default AddOrderModal

const styles = StyleSheet.create({
    modalcontiner:{
        flex:1,
        backgroundColor:'#00000056',
        justifyContent:'flex-end'
    }, modalwrapstyle:{
       height:hp(80),
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
    card: {
    backgroundColor: Colors.White,
    borderRadius: normalize(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
    paddingHorizontal:wp(4),
    paddingVertical:wp(3),
    marginBottom:hp(3),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
    columnGap:wp(3)
  },
  cardTitle: {
    fontSize: FontSize.font18,
    flex: 1,
    fontFamily:FontFamily
    .SemiBold
  },
  cardiconestyle:{
    height:wp(5),
    width:wp(5)
  },
    dateSelector: {
    flexDirection: 'row',
    //alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal:wp(2),
    paddingVertical:hp(1.2),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    columnGap:wp(3),
  },
  dateText: {
    flex: 1,
    fontSize: FontSize.font16,
    color: '#333',
  },
   requiredStar: {
    color: '#FF6B6B',
    fontSize: FontSize.font18,
    fontWeight: FontFamily.Bold,
  },
  photoPreviewContainer: {
    alignItems: 'center',
  },
  photoPreview: {
    width: '100%',
    height: hp(23),
    borderRadius: normalize(12),
    marginBottom:hp(2),
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderRadius: normalize(25),
    columnGap:wp(2)
  },
  changePhotoText: {
    color: '#fff',
    fontSize: FontSize.font14,
   fontWeight:'600'
  },
   photoOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoOption: {
    width:wp(40),
    paddingVertical:hp(2),
    paddingHorizontal:wp(2),
    borderRadius: normalize(12),
    alignItems: 'center',
  },
  cameraOption: {
    backgroundColor: Colors.Orange,
  },
  galleryOption: {
    backgroundColor: Colors.Blue,
  },
  photoOptionText: {
    color: '#fff',
    fontSize: FontSize.font12,
    fontWeight: '600',
    marginTop: hp(1),
  },
  selectedAddressIcon: {
    width: wp(10),
    height: wp(10),
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#4CAF5020'
  },
 addresstext:{
    fontSize:FontSize.font13,
    flex:1
 }
})