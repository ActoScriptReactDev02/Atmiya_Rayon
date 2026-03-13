import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { RNButton, RNContainer, RNImage, RNStyles } from '../../common'
import { hp, wp } from '../../theme'
import RNHeader from '../../common/RNHeader'

export default function OrderQRCode() {
  return (
    <RNContainer>
    <RNHeader backarrowshow={false}  title={'Order QR Code'}/>
    <View style={{flex: 1}}>
        <RNButton btnstyles={styles.btnstyle} title={'Skip'}/>
        <View style={styles.QRContainer}>
            <View style={styles.QRImage}>
                <RNImage style={RNStyles.image100} source={require('../../assets/Images/QRCode.png')}/>
            </View>
        </View>
    </View>
    </RNContainer>
  )
}

const styles = StyleSheet.create({
    btnstyle: {
        width: wp(25),
        alignSelf:'flex-end'
    },

    QRContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    QRImage:{
        width: wp(96),
        height: hp(40),
    }
})