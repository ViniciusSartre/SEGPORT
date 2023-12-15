import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

const RotasEvacuacao = () => {
  const [userLocation, setUserLocation] = useState(null);

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


  const mapRef = useRef(null);
 
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

  const [destination, setDestination] = useState(null);

  const handleCalculateRoute = () => {
  if (userLocation) {
    const destinationLocation = {
      latitude: -8.396731, // Defina a latitude do destino
      longitude: -34.985871, // Defina a longitude do destino
    };
    setDestination(destinationLocation);
  }
};
const [distance, setDistance] = useState(null);
const [duration, setDuration] = useState(null);

  


  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: -8.396731,
            longitude: -34.985871,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

        {destination && userLocation && (
        <MapViewDirections
              origin={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
              destination={{ latitude: destination.latitude, longitude: destination.longitude }}
              apikey={'AIzaSyCBt4bLC6hoDMT-WnNw1WzWxBR1G_wLXVU'}
              strokeWidth={3} // Define a largura da linha da rota
              strokeColor="purple" // Define a cor da linha da rota
              optimizeWaypoints={true}
              onReady={(result) => {
            setDistance(result.distance);
            setDuration(result.duration);
          }}
             onError={(errorMessage) => {
              console.log('Error: ', errorMessage);
          }}
        />
        )}






          <Marker
            coordinate={{
              latitude: -8.396731,
              longitude: -34.985871,
            }}
            title={'Porto de Suape'}
          >
            <Image
              source={require('../Icones/IconeBandeira.png')}

              style={styles.markerIcon}
            />
          </Marker>

          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title={'Sua Localização'}
          >
            <Image
              source={require('../Icones/IconeUsuario.png')}

              style={styles.markerIcon}
            />
          </Marker>
          

        </MapView>

        
      )}
    

      {/* Calculate Route Button */}
      <TouchableOpacity onPress={handleCalculateRoute} style={styles.calculateButton}>
        <Text style={styles.buttonText}>Calcular Rota de Fuga</Text>
      </TouchableOpacity>


      {/* Display Distance and Duration */}
      {distance !== null && duration !== null && (
        <View style={styles.routeInfo}>
          <Text>Distância: {distance.toFixed(2)} km</Text>
          <Text>Duração estimada: {duration.toFixed(2)} minutos</Text>
        </View>
      )}


      
      
      <TouchableOpacity style={styles.floatingButton} onPress={goToMarker}>
              <Image style={styles.icons} source={require('../Icones/IconeAlvo.png')}
 />
            </TouchableOpacity>

      
              

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  calculateButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,

  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  markerIcon: {
    width: 50,
    height: 50,
  },
  floatingButton: {
    position: 'absolute',
    top: 1,
    left: 0,
    paddingVertical: 5,
  },
  icons: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 5,
    marginTop: 5,
    transform: [{ scale: 1.4 }],
  },

  routeInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },

  buttonText: {
    backgroundColor: 'lightblue',
    padding: 10,
    fontSize: 15,
  },
  routeInfo: {
    position: 'absolute',
    top:0,
    right: -25,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 15,
    transform: [{ scale: .7 }],
  },
});

export default RotasEvacuacao;
