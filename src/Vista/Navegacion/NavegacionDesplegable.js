import React, { Component } from "react";
import { View,  Text, Alert } from 'react-native';

import NavegacionMapa from "./NavegacionMapa";
import NavegacionCuenta from "./NavegacionCuenta";
import Contacto from "./../Pantallas/Contacto";
import Recarga from "./../Pantallas/Recarga";
import Cuenta from "./../Pantallas/MiCuenta";

import NavegacionPilaPrueba from "./NavegacionPilaPrueba";
import NavegacionAbajo from "./NavegacionAbajo";

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Colors from "../../Modelo/Colors";

const Drawer = createDrawerNavigator();

function NavegacionPrincipal(){
    return (
      <Drawer.Navigator 
        drawerStyle={{
          backgroundColor: Colors.azulApp,
        }}
        drawerContentOptions={{
          activeTintColor: '#fff', 
          activeBackgroundColor: Colors.amarilloApp, 
          inactiveTintColor: 'grey', 
        }}
      >
       <Drawer.Screen name="Mapas" component={NavegacionMapa} />
       <Drawer.Screen name="Recarga" component={Recarga} />
       <Drawer.Screen name="Cuenta" component={Cuenta} />
       <Drawer.Screen name="Contacto" component={Contacto} />
      </Drawer.Navigator>
      );
}
export default NavegacionPrincipal;
