import React, { Component } from "react";
import { View,  Text, Alert, StyleSheet, ImageBackground } from 'react-native';

import ButtonLogin from '../Componentes/Formulario/Button';
import Logo from '../Componentes/Formulario/Logo';

import Images from "./../../Modelo/Img";
import Colors from '../../Modelo/Colors';

import localStorage from "../../Controlador/Utils/localStorage"


export default class MiCuenta extends Component {
  constructor(props){
    super(props)
    this.cuenta = this.cuenta.bind(this)
  }
  cerrarSesion(){
    global.usuario = undefined;
    localStorage.eliminar("usuario", ()=>{ 
      this.props.navigation.navigate('InicioSesion');
    })
  }
  cuenta(){
    console.log(global.usuario)
    if(global.usuario!=undefined){
      return(
          <ImageBackground source={Images.textura2} style={{width: '100%', height: '100%'}} imageStyle={{resizeMode: 'repeat'}}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
              <Logo style={stylesLoginScreen.logo} imagen = {Images.IconoUsuario}/>
              <View style={stylesLoginScreen.form}>
                <Text style = {{width: 250, fontSize: 20, margin: 10}}>
                Nombre: {global.usuario.nombre + " " + global.usuario.apellido}</Text>
                <Text style = {{width: 250, fontSize: 20, margin: 10}}>
                Matrícula: {global.usuario.placa}</Text>
                <Text style = {{width: 250, fontSize: 20, margin: 10}}>
                Saldo actual: {global.usuario.saldo}</Text>
                <ButtonLogin
                  onPress={() => { console.log("Cerrando sesión"); this.cerrarSesion(); }}
                  titleButton={"Cerrar Sesión"}>
                </ButtonLogin>
              </View>
            </View>
          </ImageBackground>
      )
    }
    else{
      return(
        <View><Text>Inicie sesión por favor</Text></View>
      )
    }
  }
  render()
  {
    console.disableYellowBox = true;
    return (
      <>
        {this.cuenta()}
      </>
    );

  }
}

const stylesLoginScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.azul,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        flex: 1,
        width: '70%',
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: -200
    },
    form: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '80%',
        backgroundColor:Colors.azulApp,
        marginTop: -200
    },
});
