import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RNStyles from './RNStyles'
import { Colors } from '../theme'

const RNLoader = ({visible}) => {
  return (
    <Modal statusBarTranslucent={true} transparent animationType='slide' visible={visible}>
<View style={styles.modalcontiner}>
    <ActivityIndicator size={'large'} color={Colors.Orange}/>
</View>
    </Modal>
  )
}

export default RNLoader

const styles = StyleSheet.create({
    modalcontiner:{
        ...RNStyles.flexCenter,
        backgroundColor:'#00000056',
        
    }
})