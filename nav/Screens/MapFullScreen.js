import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapFullScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização não concedida');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };



  const goToMarker = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  return (
    <View style={styles.container}>


      <View style={styles.div}>
        <View style={styles.backgroundmap}>
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: -8.394351285925648,
                longitude: -34.97475938160961,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {userLocation && (
                <Marker
                  coordinate={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                  }}
                  title={'Sua Localização'}
                />
              )}
            </MapView>

            <TouchableOpacity style={styles.floatingButton} onPress={goToMarker}>
              <Image style={styles.icons} source={require('../Icones/IconeAlvo.png')}
 />
            </TouchableOpacity>




          </View>


        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({




  icons: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 5,
    marginTop: 5,
    transform: [{ scale: 1.9 }],
  },

  map: {
    width: '100%',
    height: '100%',
  },

  floatingButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    paddingVertical: 5,
  },


});


export default MapFullScreen;
