import {
  FlatList,
  Linking,
  StyleSheet,
  PermissionsAndroid,
  Platform
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { RNContainer } from '../../common'
import RNHeader from '../../common/RNHeader'
import { Images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'
import { OrderItemView } from '../../components/DriverFlow'
import BackgroundGeolocation from "react-native-background-geolocation";

const OrderDetails = ({ route }) => {

  const navigation = useNavigation();
  const data = route.params.Data;

  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const watchId = useRef(null);

  // Delivery locations
const locations = [
  { lat: 21.2235511, lng: 72.8068688 }, // ActoScript
  { lat: 21.2237918, lng: 72.8066622 }, // Nilkanth Hub
  { lat: 21.2183721, lng: 72.8093945 }, // Causeway Rd
];

  // Ask location permission
  const requestLocationPermission = async () => {

    if (Platform.OS === "android") {

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  };

  // Open Google Maps Navigation
  const openGoogleMap = () => {

    const origin = `${locations[0].lat},${locations[0].lng}`;

    const destination = `${locations[locations.length - 1].lat},${locations[locations.length - 1].lng}`;

    const waypoints = locations
      .slice(1, locations.length - 1)
      .map(loc => `${loc.lat},${loc.lng}`)
      .join("|");

    const url =
      `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;

    Linking.openURL(url);
  };

  // Start GPS tracking
useEffect(() => {

  BackgroundGeolocation.onLocation(location => {

    const { latitude, longitude } = location.coords;

    console.log("Driver Location:", latitude, longitude);

    checkLocation(latitude, longitude);

  });

  BackgroundGeolocation.ready({

    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 10,
    stopOnTerminate: false,
    startOnBoot: true,

  }).then(state => {

    if (!state.enabled) {
      BackgroundGeolocation.start();
    }

  });

  return () => {
    BackgroundGeolocation.removeAllListeners();
  };

}, []);

  // Check if reached delivery location
  const checkLocation = (lat, lng) => {

    const target = locations[currentStopIndex];

    if (!target) return;

    const distance = getDistance(
      lat,
      lng,
      target.lat,
      target.lng
    );

    console.log("Distance:", distance);

    if (distance < 40) {

      console.log("Reached delivery location");

      navigation.navigate(NavRoutes.SCAN, {

        stopIndex: currentStopIndex,

        onComplete: () => {

          // Move to next stop
          setCurrentStopIndex(prev => prev + 1);

        }

      });

    }
  };

  // Distance formula
  const getDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371e3;

    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;

    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };



  return (

    <RNContainer>

      <RNHeader
        title={'Order Details'}
        righticonesource={Images.scanner}
        onRightPress={() => navigation.navigate(NavRoutes.SCAN)}
      />

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (

          <OrderItemView
            onPress={openGoogleMap}
            item={item}
          />

        )}
      />

    </RNContainer>
  )
}

export default OrderDetails

const styles = StyleSheet.create({})