import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

const ALERT = ({ Title, Text, Buttons }) => Alert.alert(Title, Text, Buttons);
const OpenUrl = url => Linking.openURL(url);

const setAppData = async data => {
   await AsyncStorage.setItem('appdata', JSON.stringify(data));
};

const getAppData = async () => {
  const value = await AsyncStorage.getItem('appdata');
  return JSON.parse(value);
};

const getUserData = async () => {
  const value = await AsyncStorage.getItem('user');
  return JSON.parse(value);
};

const setUserData = async data => {
  await AsyncStorage.setItem('user', JSON.stringify(data));
};

const setTicketData = async data => {
  await AsyncStorage.setItem('ticketdata', JSON.stringify(data));
};

const getTicketData = async () => {
  const Value = await AsyncStorage.getItem('ticketdata');
  return JSON.parse(Value);
};

const setSkipLoginFlag = async data => {
  await AsyncStorage.setItem('flag', JSON.stringify(data));
};

const getSkipLoginFlag = async () => {
  const value = await AsyncStorage.getItem('flag');
  return JSON.parse(value);
};

const setFcmToken = async data => {
  await AsyncStorage.setItem('ftoken', JSON.stringify(data));
};

const getFcmToken = async () => {
  const value = await AsyncStorage.getItem('ftoken');
  return JSON.parse(value);
};

const ToPercentage = ({ value, total }) => {
  const Percentage = Math.floor((value * 100) / total);
  return Percentage > 100 ? 100 : Percentage;
};

const ClearValue = async () => {
  const value = await AsyncStorage.getAllKeys();
   await AsyncStorage.multiRemove(value);  
};

const requestAndroidPermission = async () => {
  if (Platform.OS !== "android") return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Storage Permission Required",
        message: "App needs access to your storage to save QR code",
        buttonPositive: "OK",
        buttonNegative: "Cancel",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "App needs access to your location",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
     // console.log("Location permission granted");
    } else {
      console.log("Location permission denied");
    }

  } catch (err) {
    console.warn(err);
  }}



const Functions = {
  ALERT,
  OpenUrl,
  setAppData,
  getAppData,
  ToPercentage,
  getUserData,
  setUserData,
  ClearValue,
  setSkipLoginFlag,
  getSkipLoginFlag,
  setTicketData,
  getTicketData,
  setFcmToken,
  getFcmToken,
requestAndroidPermission,
requestLocationPermission
};

export default Functions;
