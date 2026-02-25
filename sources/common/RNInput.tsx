import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Colors, FontFamily, FontSize, hp, normalize, wp} from '../theme';
import RNImage from './RNImage';
import RNText from './RNText';
import RNStyles from './RNStyles';

const RNInput = React.forwardRef((props, ref) => {

  const {
    containerStyle,
    inputStyle,
    leftIconStyle,
    rightIconStyle,
    placeholder,
    placeholderColor,
    value,  
    onChangeText,
    onChange,
    onKeyPress,
    onSubmitEditing,
    onEndEditing,
    onFocus,
    onBlur,
    keyboardType = 'default',
    returnKeyType = 'next',
    secureTextEntry = false,
    textAlign = 'left',
    maxLength,
    editable = true,
    multiline = false,
    numberOfLines = 1,
    spellCheck = true,
    leftIconSource,
    leftContainerStyle,
    rightIconSource,
    rightContainerStyle,
    rightIconPress,
    rightIcontintColor,
    leftIcontintColor,
    autoFocus,
    contextMenuHidden,
    rightBtnDisable,
    errormessage,
    error
  } = props;

  return (
    <View style={{ marginBottom:hp(2.5)}}>
    <View style={[styles.inputContainer, containerStyle]}>
      {leftIconSource && (
        <View style={[leftContainerStyle,{...RNStyles.flexRow, columnGap:wp(2)}]}>
          <RNImage
            tintColor={leftIcontintColor}
            source={leftIconSource}
            style={[styles.icon, leftIconStyle]}
          />
          <RNText color={Colors.Grey + '50'} children={'|'}/>
        </View>
      )}
      <TextInput
        autoFocus={autoFocus}
        allowFontScaling={false}
        ref={ref}
        style={[styles.textInput, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor ?? Colors.Grey}
        value={value}
        onChange={onChange}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        onSubmitEditing={onSubmitEditing}
        onEndEditing={onEndEditing}
        onFocus={onFocus}
        onBlur={onBlur}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        textAlign={textAlign}
        textAlignVertical="center"
        autoCorrect={false}
        spellCheck={spellCheck}
        autoCapitalize="none"
        maxLength={maxLength}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        contextMenuHidden={contextMenuHidden}
      />
      {rightIconSource && (
        <TouchableOpacity
          disabled={rightBtnDisable}
          onPress={rightIconPress}
          style={rightContainerStyle}>
          <RNImage
            tintColor={rightIcontintColor}
            source={rightIconSource}
            style={[styles.icon, rightIconStyle]}
          />
        </TouchableOpacity>
      )}
    </View>
    {error && <RNText style={styles.errortextstyle} children={errormessage}/>}
    </View>
  );
});

const styles = 
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: hp(6),
      backgroundColor:Colors.White,
      borderRadius:normalize(6),
      paddingHorizontal: wp(2.5),
     
    },
    textInput: {
      flex: 1,
      paddingHorizontal: wp(2),
      paddingVertical: hp(1),
      fontSize: FontSize.font13,
      fontFamily: FontFamily.Regular,
      color: Colors.Black,
    },
    icon: {
      width: wp(4),
      height: wp(4.5),
    },
    errortextstyle : {
    fontSize:  FontSize.font9,
    paddingTop:hp(0.5),
    color:Colors.Red
    }
  });

export default RNInput;
