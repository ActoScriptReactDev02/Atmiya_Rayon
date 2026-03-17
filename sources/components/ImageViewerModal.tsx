import { Modal, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { RNImage, RNStyles } from '../common'
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { Colors, hp, normalize, wp } from '../theme';
import { Images } from '../constants';


const ImageViewerModal = ({ visible, imageURL,onRequestClose }) => {
  
  return (
    <Modal statusBarTranslucent={true} visible={visible} transparent>
      <View style={styles.modalcontiner}>
           <Pressable onPress={onRequestClose} style={{paddingBottom:hp(4)}}>
                    <RNImage source={Images.close} style={styles.iconestyle}/>
                </Pressable>
        <View style={styles.modalmainstyle}>
     
        <View style={styles.imageviewwrapstyle}>
       <ReactNativeZoomableView
           minZoom={1}
           zoomStep={0.5}
           initialZoom={1}
           contentWidth={wp(100)}
           contentHeight={hp(50)}
        >
         <RNImage ImageUri={imageURL} style={{...RNStyles.image100}}/>
        </ReactNativeZoomableView>
      </View>
      </View>
      </View>
    </Modal>
  )
}

export default ImageViewerModal

const styles = StyleSheet.create({
  modalcontiner:{
    ...RNStyles.flexCenter,
    justifyContent:'flex-end',
    backgroundColor:'#00000056',
  },

  imageviewwrapstyle:{
    height:wp(100),
    width:'100%',
    borderRadius:normalize(10),
    overflow:'hidden',
  },
     iconestyle:{
        height:wp(10),
        width:wp(10),
        tintColor:Colors.Orange,
        backgroundColor:'white',
        borderRadius:normalize(50)
    },
    modalmainstyle:{
      backgroundColor: Colors.White,
       height:hp(55), 
       width:'100%',
       paddingHorizontal:wp(4),
       borderTopLeftRadius:normalize(10), 
       borderTopRightRadius:normalize(10),
       alignSelf:'center',
       paddingTop:hp(4)
    }
})