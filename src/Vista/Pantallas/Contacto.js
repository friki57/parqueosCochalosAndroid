import React, { Component } from "react";
import { View,  Text, Alert,StyleSheet } from 'react-native';

import Logo from '../Componentes/Formulario/Logo';

import Images from "./../../Modelo/Img";

import ButtonLogin from '../Componentes/Formulario/Button';

import notificaciones from "./../../Controlador/Utils/notificaciones"

var cont = 0;
export default class Contacto extends Component {
  render()
  {
    console.log("+++++++++++++++++++++++++++=============",this.props.route)
    console.disableYellowBox = true;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Logo imagen = {Images.IconoTelefono}/>
        <View style = {stylesLoginScreen.form}>
          <Text style = {{width: 250, fontSize: 26, marginBottom: 30, marginTop:0}}>
            Contacto</Text>
          <Text style = {{width: 250, fontSize: 16, margin: 0}}>
          Nuestra línea gratuita
          8-41431-8493-1034
          Oficina Centro
            Calle heroínas esq Lanza
            Edificio Juan de Dios. Piso 2.
            OF 3.
            Cel: 78490342
            Tel: 4492076
            4284098

          Oficina Zona Sud
            Avenida Petrolera km 6 num
            562#
            Cel: 72348098
            Tel: 43990231
            4884020
            </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ButtonLogin
            onPress={() => {
              console.log("Notificación"); 
              notificaciones.nuevaTiempo(1000*5, {id: "x", title:"Parqueos cochalos", body: "notificación de prueba(tiempo): "+ cont}); 
              cont+=1;
              notificaciones.nuevaFecha(new Date((new Date()).getTime()+10*1000), {id: "x2", title:"Parqueos cochalos", body: "notificación de prueba (fecha): "+ cont}); 
              cont+=1;
            }}
            titleButton={"Notificación"}>
          </ButtonLogin>
        </View>
      </View>
    );

  }
}

const stylesLoginScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00f",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
});
