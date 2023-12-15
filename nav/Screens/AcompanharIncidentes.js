import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const AcompanharIncidentes = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhar Incidentes</Text>
      {/* Seu conteúdo aqui */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // Adicione estilos adicionais conforme necessário para o conteúdo da tela
});

export default AcompanharIncidentes;