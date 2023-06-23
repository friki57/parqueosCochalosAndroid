import React, { Component } from "react";
import { View, Text, Alert, Image } from 'react-native';
import Mapa from "../Componentes/Mapas/Mapa";
//import imagenes from "./../../Modelo/Img";
import Logo from '../Componentes/Formulario/Logo';

import Images from "./../../Modelo/Img";
const colores = {
  rojo: "#f46",
  verde: "#6f4",
  azul: "#36f",
  negro: "#000",
  tan: "#FFC300"
}
export default class Inicio extends Component {
  render()
  {
    //console.log(this.props.route,global.usuario)
    console.disableYellowBox = true;
    return (
      <View style={{ flex: 1, flexDirection:"column"}}>
        <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#456" }}>
          <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={Images.marca} style={{width: 115, height: 42}}></Image>
          </View>

          <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'flex-start', marginLeft:50 }}>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
              <View style={{width: 10, height: 10, backgroundColor: colores.rojo}}/>
              <Text style={{fontSize:10}}>Calles prohibidas</Text>
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
              <View style={{width: 10, height: 10, backgroundColor: colores.tan}}/>
              <Text style={{fontSize:10}}>Calles sin espacios disponibles</Text>
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
              <View style={{width: 10, height: 10, backgroundColor: colores.verde}}/>
              <Text style={{fontSize:10}}>Calles con espacios disponibles</Text>
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
              <View style={{width: 10, height: 10, backgroundColor: colores.azul}}/>
              <Text style={{fontSize:10}}>Calle seleccionada</Text>
            </View>
          </View>

        </View>
        <Mapa></Mapa>

      </View>
    );

  }
}
