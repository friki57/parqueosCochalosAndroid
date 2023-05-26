/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import NavegacionPrincipal from "./src/Vista/Navegacion/NavegacionPrincipal"

function App(): JSX.Element {
  return (
    <NavegacionPrincipal />
  );
}

export default App;
