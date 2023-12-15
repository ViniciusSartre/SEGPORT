// Importações necessárias
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // Importação do MapView e Marker
import * as Location from 'expo-location'; // Importação do módulo de localização










// Componente Home
const Home = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null); // Estado para a localização do usuário
  const mapRef = useRef(null); // Referência para o MapView

  useEffect(() => {
    getLocation(); // Obtenção da localização ao montar o componente
  }, []);

  // Função para obter a localização do usuário
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização não concedida');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  // Função para movimentar o mapa para a localização do usuário
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



  // Retorno do componente
  return (
    <View style={styles.container}>
      
       
      {/* Logo */}
      <View>
      <Image source={require('../Icones/SegportLogotipo.png')}
 style={styles.logotipo} ></Image> 
     {/* <Image source={require('../Icones/IconeLogotipoNavio')} style={styles.icons}></Image>*/}
      </View>
      
      {/* Botões para navegação */}
      <View style={styles.div}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RotasEvacuacao')}>
         <Image style={styles.icons} source={require('../Icones/IconeRotasDeEvacuacao.png')} />
          <Text style={styles.buttonText}>Rotas de evacuação</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.div}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RelatarIncidentes', { latitude: userLocation.latitude, longitude: userLocation.longitude })}>
          <Image style={styles.icons} source={require('../Icones/IconeRelatarIncidentes.png')}/>

          <Text style={styles.buttonText}>Relatar Incidentes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.div}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AcompanharIncidentes')}>
          <Image style={styles.icons} source={require('../Icones/IconeAcompanhamento.png')}/>
          <Text style={styles.buttonText}>Acompanhar Incidentes</Text>
        </TouchableOpacity>
      </View>

  
      {/* Mapa e botões relacionados */}
      <View style={styles.div}>
        <View style={styles.backgroundmap}>
          <View style={styles.mapContainer}>
            {/* MapView */}
            <MapView
              provider={PROVIDER_GOOGLE}
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: -8.394351285925648,
                longitude: -34.97475938160961,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {/* Marcação da localização do usuário */}
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

            {/* Botão flutuante para ir para a localização do usuário */}
            <TouchableOpacity style={styles.floatingButton} onPress={goToMarker}>
              <Image style={styles.icons} source={require('../Icones/IconeAlvo.png')}
 />
            </TouchableOpacity>

            {/* Botão para expandir o mapa */}
            <TouchableOpacity style={styles.expandButton} onPress={() => navigation.navigate('MapFullScreen')}>
              <Image style={styles.icons} source={require('../Icones/IconeExpandir.png')}
 />
            </TouchableOpacity>

                  

          </View>


          <View style={styles.div}>
              <TouchableOpacity style={styles.buttonemergency} onPress={() => navigation.navigate('ContatosEmergencia')}>
                   <Image style={styles.icons} source={require('../Icones/IconeContatoEmergencia.png')}/>
                   <Text style={styles.buttonText}>Ligar para Emergência</Text>
               </TouchableOpacity>
           </View>

        </View>
      </View>
    </View>
    
  );
};

// Estilos do componente



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 50,
    alignItems: 'center',
  },
  imageBackground: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  logotipo: {
    
    height: 150,
    marginBottom:10,
    
    transform: [{ scale: 0.6 }],
  
    
  },
  buttonemergency:{
    flexDirection: 'row',
    width: 300,
    height: 50,
    padding: 10,
    backgroundColor: '#E71115',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 15,
    color:'white',
  },

  div: {
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    width: 300,
    height: 50,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    marginTop: 20,
    borderRadius: 10,
    width: 300,
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
  },
  iconsmap: {
    width: 20,
    height: 20,
    marginLeft: 15,
    marginTop: 5,
    transform: [{ scale: 1.4 }],
  },
  icons: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 5,
    marginTop: 5,
    transform: [{ scale: 1.4 }],
  },
  backgroundmap: {
    width: 300,
    height: 200,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  floatingButton: {
    position: 'absolute',
    top: 1,
    left: 0,
    paddingVertical: 5,
  },
  expandButton: {
    position: 'absolute',
    top: 1,
    right: 0,
    paddingVertical: 5,
  },

});

export default Home;
