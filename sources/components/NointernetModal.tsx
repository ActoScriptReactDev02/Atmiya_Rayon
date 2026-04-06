import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RNStyles, RNText} from '../common';
import LottieView from 'lottie-react-native';
import {Colors, FontFamily, FontSize, hp, normalize, wp} from '../theme';


const NointernetModal = ({visible}) => {
  return (
    <Modal transparent visible={visible} statusBarTranslucent={true}>
      <View style={styles.ModalContiner}>
        <View style={styles.ModalView}>
          <View style={{alignItems: 'center'}}>
            <LottieView
              loop
              autoPlay
              source={require('../assets/Lottie/Nointernet.json')}
              style={{height: wp(20), width: wp(20)}}
            />
          </View>
          <View>
            <RNText
              align={'center'}
              pTop={hp(2)}
              size={FontSize.font18}
              family={FontFamily.Medium}
              children={'No internet Connection'}
            />
            <RNText
              size={FontSize.font14}
              color={Colors.GreyLight}
              align={'center'}
              pTop={hp(1)}
              children={'Please check your internet Connection and try again.'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NointernetModal;

const styles = StyleSheet.create({
      ModalContiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0 ,0 , 0, 0.5)',
  },
  ModalView: {
    backgroundColor: Colors.White,
    width: wp(85),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    borderRadius: normalize(13),
  },
});