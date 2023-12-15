// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Screens/Home';
import RotasEvacuacao from './Screens/RotasEvacuacao';
import RelatarIncidentes from './Screens/RelatarIncidentes';
import MapFullScreen from './Screens/MapFullScreen';
import AcompanharIncidentes from './Screens/AcompanharIncidentes';
import ContatosEmergencia from './Screens/ContatosEmergencia';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RotasEvacuacao" component={RotasEvacuacao} />
        <Stack.Screen name="RelatarIncidentes" component={RelatarIncidentes} />
        <Stack.Screen name="MapFullScreen" component={MapFullScreen} />
        <Stack.Screen name="ContatosEmergencia" component={ContatosEmergencia} />
        <Stack.Screen name="AcompanharIncidentes" component={AcompanharIncidentes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
