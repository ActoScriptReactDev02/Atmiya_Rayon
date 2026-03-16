import {
  FlatList,
  Linking,
  StyleSheet,
  PermissionsAndroid,
  Platform
} from 'react-native'

import React, { useEffect, useState, useRef } from 'react'
import Geolocation from 'react-native-geolocation-service'
import { RNContainer } from '../../common'
import RNHeader from '../../common/RNHeader'
import { Images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { NavRoutes } from '../../navigation'
import { OrderItemView } from '../../components/DriverFlow'

const OrderDetails = ({ route }) => {
  const navigation = useNavigation()  
  const data = route.params.Data
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentStopIndex, setCurrentStopIndex] = useState(0)
  const watchId = useRef(null)
  const [navigationStarted, setNavigationStarted] = useState(false);

  // const locations = [  
  //   { lat: 21.2235511, lng: 72.8068688 },
  //   { lat: 21.2237918, lng: 72.8066622 },
  //   { lat: 21.2183721, lng: 72.8093945 },
  // ]
const locations = [
  { lat: 21.2235511, lng: 72.8068688 }, // ActoScript / Nilkanth Business Hub
  { lat: 21.2043355, lng: 72.8401923 }, // Surat Railway Station
  { lat: 21.7033128, lng: 72.9992777 }  // Bharuch Railway Station
];

  const requestLocationPermission = async () => {

    if (Platform.OS === "android") {

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
      title: "Location Permission",
      message: "App needs location access",
      buttonPositive: "OK",
    }
      )

      return granted === PermissionsAndroid.RESULTS.GRANTED
    }

    return true
  }

  const openGoogleMap = () => {
    setNavigationStarted(true);   // START TRACKING
    const origin = `${locations[0].lat},${locations[0].lng}`

    const destination = `${locations[locations.length - 1].lat},${locations[locations.length - 1].lng}`

    const waypoints = locations
      .slice(1, locations.length - 1)
      .map(loc => `${loc.lat},${loc.lng}`)
      .join("|")

    const url =
      `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`
      console.log('url',url);
      

    Linking.openURL(url)
  }

  useEffect(() => {

    const startTracking = async () => {

      const granted = await requestLocationPermission()
      if (!granted) {
    console.log("Permission denied");
    return;
  }

      watchId.current = Geolocation.watchPosition(

        (position) => {

          const { latitude, longitude } = position.coords

          console.log("Driver Location:", latitude, longitude)

          checkLocation(latitude, longitude)

        },

        (error) => {
          console.log("Location Error:", error)
        },

        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 5000,
          fastestInterval: 2000,
          showsBackgroundLocationIndicator: true
        }
      )
    }

    startTracking()

    return () => {

      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current)
      }

    }

  }, [currentStopIndex])

  const checkLocation = (lat, lng) => {

    if (!navigationStarted) return;  // ❗IMPORTANT
    if (isNavigating) return

    const target = locations[currentStopIndex]
    if (!target) return

    const distance = getDistance(lat, lng, target.lat, target.lng)

    console.log("Distance:", distance)

    if (distance < 50) {
      setIsNavigating(true)
      console.log("Reached delivery location")
      navigation.navigate(NavRoutes.SCAN, {
        stopIndex: currentStopIndex,
        onComplete: () => {
          setCurrentStopIndex(prev => prev + 1)
          setIsNavigating(false)
        }
      })

    }

  }

  const getDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371e3

    const φ1 = lat1 * Math.PI / 180
    const φ2 = lat2 * Math.PI / 180

    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lon2 - lon1) * Math.PI / 180

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

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