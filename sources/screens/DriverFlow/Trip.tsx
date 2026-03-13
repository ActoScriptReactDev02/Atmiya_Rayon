import {  PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RNContainer } from '../../common'
import RNHeader from '../../common/RNHeader'
import { PERMISSIONS, request } from 'react-native-permissions';
import GetLocation from 'react-native-get-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { wp } from '../../theme';



const Trip = () => {

const tripLocations = [
  { name: "Kataram", latitude: 21.1702, longitude: 72.8311 },
  { name: "Dabholi", latitude: 21.1610, longitude: 72.8280 },
  { name: "Gajera", latitude: 21.1725, longitude: 72.8350 },
  { name: "Varachha", latitude: 21.1800, longitude: 72.8400 }
];
  const [locations, setLocations] = useState(tripLocations);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Simulate live movement along the trip
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < locations.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }, 5000); // move every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentLocation = locations[currentIndex];



    useEffect(() => {
        if(Platform.OS == 'android'){
          requestLocationPermission()
        }else{
           getLocation()
        }
  },[])


const requestLocationPermissionIOS = async () => {
  const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

  if (result === 'granted') {
    console.log("Location permission granted");
    getLocation();
  } else {
    console.log("Location permission denied");
  }
};

  const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Location permission granted");
     getLocation();
    } else {
      console.log("Location permission denied");
    }

  } catch (err) {
    console.warn(err);
  }
};

const getLocation = () => {
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
  .then(location => {
    console.log("Latitude:", location.latitude);
    console.log("Longitude:", location.longitude);
  })
  .catch(error => {
    const { code, message } = error;
    console.log(code, message);
  });
};
  return (
   <RNContainer style={{paddingHorizontal:wp(0)}}>
   <View style={{paddingHorizontal:wp(4)}}>
     <RNHeader title={'Start trip'}/>
   </View>
     <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: locations[0].latitude,
          longitude: locations[0].longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        {/* All trip locations */}
        {locations.map((loc, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            title={loc.name}
            pinColor={
              index === 0
                ? "green"       // Start
                : index === locations.length - 1
                ? "red"         // End
                : "blue"        // Waypoints
            }
          />
        ))}

        {/* Route line along trip */}
        {locations.length > 1 && (
          <Polyline
            coordinates={locations.map(loc => ({
              latitude: loc.latitude,
              longitude: loc.longitude
            }))}
            strokeWidth={4}
            strokeColor="#FF6347"
          />
        )}

        {/* Live marker for current moving location */}
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude
            }}
            title="Current Location"
            pinColor="purple"
          />
        )}
      </MapView>
      </View>
   </RNContainer>
  )
}

export default Trip

const styles = StyleSheet.create({})