import React from 'react';
import { View, TouchableOpacity, Image, Linking, StyleSheet } from 'react-native';

const ContatosEmergencia = () => {
  const callEmergency = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../Icones/Background.png')} 
        style={styles.imageBackground}
      />
       <View style={styles.gradientBackground} />
      
      <TouchableOpacity
        style={[styles.button, styles.policeButton]}
        onPress={() => callEmergency('190')} // Número da Polícia
      >
        
        <Image source={require('../Icones/IconePolicia.png')}
 style={styles.logotipo}           />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.firefightersButton]}
        onPress={() => callEmergency('193')} // Número do Corpo de Bombeiros
      
      >
        <Image source={require('../Icones/IconeBombeiro.png')}
 style={styles.logotipo}           />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.samuButton]}
        onPress={() => callEmergency('192')} // Número do SAMU
      >
       <Image source={require('../Icones/IconeAmbulancia.png')}
 style={styles.logotipo}           />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  imageBackground: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
   
  button: {
    margin: 10,
    padding: 15,
    borderRadius: 100, 
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    elevation: 10,
    marginBottom:50,
   
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  policeButton: {
    backgroundColor: '#2596be',
  },
  firefightersButton: {
    backgroundColor: '#E71115',
  },
  samuButton: {
    backgroundColor: '#be2528',
  },
  logotipo:{
    transform: [{ scale: 0.15 }],

  },
});

export default ContatosEmergencia;
