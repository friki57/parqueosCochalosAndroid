import Onboarding from 'react-native-onboarding-swiper';
import React, { Component } from "react";
import { View,  Text, Alert, Image, TouchableOpacity } from 'react-native';
import imagenes from "./../../Modelo/Img";
import localStorage from "../../Controlador/Utils/localStorage"

/* console.log(imagenes)
console.log("Onboardiiiiiiiiiiiiiiiiiiiiiiiing") */
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default class Onboard extends Component {
  constructor(props){
    super(props);
    this.salir = this.salir.bind(this);/* 
    const usuario = localStorage.leer('usuario');
    console.log("---------usuario------------------", usuario) */
  }
  componentDidMount(){
    const usuario = localStorage.leer('usuario', (us)=>{
      /* console.log("*****************usuario.................", us, us.placa) */
      if (us.placa !== undefined) {
        global.usuario = us;
        this.props.navigation.navigate("Desplegables", {
          screen: "Mapas"
        })
      } 
    });
  }
  salir = () => {this.props.navigation.navigate('InicioSesion')};
  render()
  {
    console.disableYellowBox = true;
    return (

        <Onboarding
          onDone={this.salir}
          onSkip={this.salir}
          nextLabel="Siguiente"
          skipLabel="Saltar"
          DoneButtonComponent={()=>(<TouchableOpacity onPress={this.salir}><Text style = {{marginRight:20,fontSize:16,color:"#fff"}}>Fin</Text></TouchableOpacity>)}
          pages={[
            {
              backgroundColor: '#fff',
              image: <Image source={imagenes.QuienesSomos} style = {{width:400,height:400}}/>,
              title: '¿Quienes Somos?',
              subtitle: 'Esta aplicación te permite controlar tu tiempo en los espacios de estacionamiento contralados por el departamento de tránsito.',
            },
            {
              backgroundColor: '#0B313F',
              image: <Image source={imagenes.Mapas} style = {{width:400,height:400}}/>,
              title: '¡Mapas interactivos!',
              subtitle: 'Visualiza las calles de la ciudad de Cochabamba en un mapa interactivo, el cual te permite ver la ubicación de los diferentes postes de servicio además de la cantidad de espacios disponibles en cada calle.',
            },
            {
              backgroundColor: '#E79A32',
              image: <Image source={imagenes.Contacto} style = {{width:400,height:400}}/>,
              title: 'Contáctanos',
              subtitle: 'Estamos siempre atentos a tus necesidades para tus conflictos de grúa y estacionamiento. Nuestra información de contacto está disponible siempre en la aplicación.',
            }

          ]}
        ></Onboarding>

    );

  }
}
