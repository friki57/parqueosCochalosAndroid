import React, { Component } from "react";
import { View,  Text, Alert, ImageBackground} from 'react-native';

import ButtonLogin from '../Componentes/Formulario/Button';
import SocketIOClient from 'socket.io-client/dist/socket.io.js'

import Images from "./../../Modelo/Img";
import Fetch from "../../Controlador/Utils/Fetch";

import notificaciones from "../../Controlador/Utils/notificaciones"

const dominio = "http://83.229.86.168:5000"

export default class Actual extends Component {
  constructor(props){
    super(props);
    this.state = {
      calle:"",
      fecha:"",
      fechaFinal:"",
      tiempoRestante: -1
    }
    this.adicionarTiempo = this.adicionarTiempo.bind(this);
    this.notificar = this.notificar.bind(this);
    setTimeout(()=>
    {
      this.socket = SocketIOClient(dominio, { transports: ['websocket'], jsonp: false });
      this.socket.connect();
      this.socket.on('calles', (res)=>
      {
        console.log(",,,,,,,,,,,,,,,,,,,,,,, calles")
        Fetch("/ParqueoActual/"+global.usuario.key, (res)=>{
          console.log("---------------------------------------",res)
          if(res!=0) {
            this.setState(res, ()=>{
              this.notificar();
            }) 
          }
          else
            this.setState({
              calle: "",
              fecha: "",
              fechaFinal: "",
              tiempoRestante: -1
            })
          })
      });
    },1000)
    Fetch("/ParqueoActual/"+global.usuario.key, (res)=>{
      console.log("..........................",res)
      if(res!=0)
      this.setState(res,()=>{
        this.notificar();
      })

    })
  }
  notificar() {
    console.log("parqueo actual------------------------")  
    const minutosRestantes = Math.round(((this.state.tiempoRestante % 86400000) % 3600000) / 60000);
    console.log(minutosRestantes);  
    marcas = [15, 10, 5, 1];
    marcas.forEach((m)=>{
      notificaciones.nuevaTiempo((minutosRestantes-m) * 1000 * 60, { id: m.toString(), title: "Quedan " + m + " minutos de estacionamiento", body: "Recuerda ya solo te quedan " + m + " minutos de tiempo de estacionamiento, ingresa a la aplicación para extender tu tiempo"});
      if(minutosRestantes>m){
      } else {
        
      }
      
    })
  }
  adicionarTiempo(t)
  {
    Fetch("/aumentartiempo/".concat(t,"/",global.usuario.key,"/",global.usuario.saldo), (res)=>{
      console.log("2222222222222222222222222222")
      console.log(res)
      Alert.alert(res.resp);
      // if(res!=0)
      // this.setState(res)
    }, {}, "POST")
  }
  componentDidMount(){

  }
  render()
  {
    console.disableYellowBox = true;
    return (
      <ImageBackground source={Images.textura1} style={{width: '100%', height: '100%'}} imageStyle={{resizeMode: 'repeat'}}>
      {
        this.state.calle.length>0?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ padding: 10, backgroundColor: "#ccc", margin: 30, borderRadius: 10, fontSize: 20 }}>
                Actulamente estacionado en: {"\n"}
                {this.state.calle.trim()} {"\n"}
                Desde las {this.state.fecha} {"\n"}
                Con tiempo limite hasta las {this.state.fechaFinal}
              </Text>
              <Text style={{ padding: 10, backgroundColor: "#fcc", margin: 30, borderRadius: 10, fontSize: 20 }}>
                Modificar Tiempos
              </Text>
              <ButtonLogin
                onPress={() => { console.log("Añadir 30 minutos"); this.adicionarTiempo(30) }}
                titleButton={"Añadir 30 minutos"}>
              </ButtonLogin>
              <ButtonLogin
                onPress={() => { console.log("Añadir 1 hora"); this.adicionarTiempo(60) }}
                titleButton={"Añadir 1 hora"}>
              </ButtonLogin>
              <ButtonLogin
                onPress={() => { console.log("Añadir 2 horas"); this.adicionarTiempo(120) }}
                titleButton={"Añadir 2 horas"}>
              </ButtonLogin>
            </View>
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ButtonLogin
                onPress={() => { 
                  console.log("Abriendo cámara"); this.props.navigation.navigate('Camara');
                }}
                titleButton={"Escanear QR de parqueo"}>
              </ButtonLogin>
            </View>
      }
      </ImageBackground>
    );

  }
}
