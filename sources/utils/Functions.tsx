import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import { useDispatch } from 'react-redux';

const ALERT = ({ Title, Text, Buttons }) => Alert.alert(Title, Text, Buttons);
const OpenUrl = url => Linking.openURL(url);

const setAppData = async data => {
  const previousValue = await getAppData();
  if (previousValue) {
    await AsyncStorage.setItem(
      'appdata',
      JSON.stringify({ ...previousValue, ...data }),
    );
  } else {
    await AsyncStorage.setItem('appdata', JSON.stringify(data));
  }
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
  const KeyToRemove = value.filter(value => value !== 'flag');
  if (KeyToRemove.length > 0) {
    await AsyncStorage.multiRemove(value);
  }
};

const getcurrentloaction = async () => {
  if (Platform.OS == 'android') {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (!result) return {};
  }
  try {
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    });

    const loactiondata = await getLiveloaction(
      location.latitude,
      location.longitude,
    );
    return loactiondata;
  } catch (error) {
    if (
      error?.message?.includes('disabled') ||
      error?.message?.includes('denied')
    ) {
      Alert.alert(
        'Enable Location',
        'Location services are disabled. Please turn on GPS to continue.',
        [
          {
            text: 'Open Settings',
            onPress: () => {
              Platform.OS === 'android'
                ? Linking.sendIntent(
                    'android.settings.LOCATION_SOURCE_SETTINGS',
                  )
                : Linking.openSettings('App-prefs:LOCATION_SERVICES');
            },
          },
          { text: 'Cancel', style: 'cancel' },
        ],
      );
    }
  }
};
const getLiveloaction = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCOBWtVtISFYRKyw3lhBNctKUnCpY6VEJ8`,
    );

    const json = await response.json();
    //const data = json?.results[0]?.address_components;
    const data = json?.results.flatMap(item => item.address_components);

    const cityObj = data?.filter(item =>
      item.types.includes('locality', 'political'),
    );
    const sublocalityobj = data?.filter(
      item =>
        ((item.types.includes('sublocality_level_1') ||
          item.types.includes('administrative_area_level_1')) &&
          item.types.includes('political')) ||
        item.types.includes('sublocality'),
      // item.types.includes('sublocality_level_1') &&
      // item.types.includes('political') &&
      // item.types.includes('sublocality'),
    );

    // const filterdata = data?.filter(
    //   item =>
    //     (item.types.includes('locality') && item.types.includes('political')) ||
    //     (item.types.includes('sublocality_level_1') &&
    //       item.types.includes('political') &&
    //       item.types.includes('sublocality')),
    // );
    const findsubarea = sublocalityobj?.find(item =>
      item.types.includes('sublocality_level_1', 'political', 'sublocality'),
    );

    if (cityObj[0].long_name || sublocalityobj[0].long_name) {
      const liveloactiondata = {
        CityName: cityObj[0]?.long_name,
        SublocalityName: findsubarea
          ? findsubarea?.long_name
          : sublocalityobj[0]?.long_name,
        lat: latitude,
        lng: longitude,
      };
      return liveloactiondata;
    }
  } catch (error) {
    console.log('Get live location api error -->', error);
    return null;
  }
};

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
  getcurrentloaction,
  getLiveloaction,
};

export default Functions;
