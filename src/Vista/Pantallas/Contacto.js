import React, { Component } from "react";
import { View,  Text, Alert,StyleSheet, ImageBackground } from 'react-native';

import Logo from '../Componentes/Formulario/Logo';

import Images from "./../../Modelo/Img";

import ButtonLogin from '../Componentes/Formulario/Button';

import notificaciones from "./../../Controlador/Utils/notificaciones"
import Colors from "../../Modelo/Colors";

var cont = 0;
export default class Contacto extends Component {
  render()
  {
    console.log("+++++++++++++++++++++++++++=============",this.props.route)
    console.disableYellowBox = true;
    return (
      <ImageBackground source={Images.textura5} style={{ width: '100%', height: '100%' }} imageStyle={{ resizeMode: 'repeat' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', ...stylesLoginScreen.container }}>
        <Logo imagen = {Images.telBlanco}/>
          <View style = {stylesLoginScreen.form}>
            <Text style = {{width: 250, fontSize: 26, marginBottom: 30, marginTop:0, color: "#000", backgroundColor: Colors.transparente}}>
              Contacto</Text>
            <Text style = {{width: 250, fontSize: 16, margin: 0, color: "#000", backgroundColor: Colors.transparente}}>
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
          {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
          </View> */}
        </View>
      </ImageBackground>
    );

  }
}

const stylesLoginScreen = StyleSheet.create({
    container: {
        flex: 1,
        
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
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        color: "#000",
        
    },
});
