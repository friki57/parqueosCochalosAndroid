import React, { Component } from "react";
import { View,  Text, Alert } from 'react-native';
import Marcador from "./Marcador"
import Mapbox from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import SocketIOClient from 'socket.io-client/dist/socket.io.js'

const dominio = "http://83.229.86.168:5000"

const colores = {
  rojo: "#f46",
  verde: "#6f4",
  azul: "#36f",
  amarillo: "#000"
}
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken("pk.eyJ1IjoiZnJpa2k1NyIsImEiOiJjanZxOGtxMjgwaDhxNDRvOHl5NDVvZnQyIn0._cULjNb2IP5SLSBSm7Higw");
Mapbox.setConnected(true);

class Mapa extends Component
{
  constructor(props){
    super(props);
    this.state = {
      ubicacion: this.props.ubicacion,
      ubicacionActual: undefined,
      MarcadorUbicacion: undefined,
      Calles: undefined
    }
    this.actualizar = this.actualizar.bind(this);
    setTimeout(()=>
    {
      this.socket = SocketIOClient(dominio, { transports: ['websocket'], jsonp: false });
      this.socket.connect();
      this.socket.on('calles', (res)=>
      {
        this.actualizar(res)
      });
    },1000)
    Geolocation.getCurrentPosition(
      posicion => {
        const ubicacion = (posicion);

        this.setState({ ubicacionActual:
          [ubicacion.coords.longitude,
          ubicacion.coords.latitude]
         });
        if(this.state.ubicacion == undefined)
        {
          this.setState({ubicacion: this.state.ubicacionActual})
        }
        this.setState(
          {MarcadorUbicacion : (<Marcador color={colores.amarillo} id="aca" ubicacion = {this.state.ubicacion} texto = "Usted está acá"></Marcador>)}
        );
        fetch(dominio + "/MapasMovil")
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.actualizar(data);
          });
      },
      error => Alert.alert("Imposible obtener la localización.\nFavor de conectarse a internets."),
      { enableHighAccuracy: true, timeout: 20000 }
    );
  }
  actualizar(data)
  {
    this.setState({Calles:undefined})
    data = data.filter(a=>a!=undefined)
    data = data.filter(a=>a.geojson!=undefined)
    data = data.map(
      (a)=>
      {
        //console.log("1234", a)
        a.lon = (a.geojson[0].lon + a.geojson[1].lon)/2;
        a.lat = (a.geojson[0].lat + a.geojson[1].lat)/2;
        if(a.placas!=undefined)
        a.placas = a.placas.map(b=>{
          b.tiempoRestante = Math.floor((new Date(b.hora) - Date.now() + b.tiempo * 60 * 1000) / (1000));
          b.tiempopl = ((b.tiempoRestante>60)?Math.floor((b.tiempoRestante/60).toString()):"menos de 1");
          return b
        })
        return a;
      }
    )
    console.log("----------------------------------")
    console.log(data)
    console.log("----------------------------------")
    var marcadores = data.map((a,i)=>
      {
        if(a.espacios!=undefined)
        {
          var placas = "";
          if(a.placas!=undefined)
          a.placas.map(b=>{
            placas = placas + b.placa + " : " + b.tiempopl + " minutos restantes\n"
          })
          console.log("AAAA",a);
          var colorp = colores.rojo
          if (a.pago==false) {
            colorp==colores.rojo;
          }
          else {
            if(a.espacios==a.espaciosMaximo)
              colorp=colores.azul;
            else {
              colorp=colores.verde;
            }
          }

          return (
            <Marcador id={i.toString()} color={colorp} ubicacion = {[a.lon, a.lat]} texto={(a.calle+" entre "+a.c1+" y "+a.c2)} key = {i.toString()+(new Date()).toString()}></Marcador>
          )
        }
      })


    this.setState(
      {
        Calles: marcadores
        //Calles: (<Marcador color={colores.rojo} id="aca2" ubicacion={[-66.1556638449178, -17.389506188021315]} texto="Usted está acá"></Marcador>)
      }, ()=>{
        console.log("------------sd:", this.state.MarcadorUbicacion, this.state.Calles)
      }
    )
  }
  render()
  {
    return (
      <>
      <Mapbox.MapView
        style={styles.container}
        styleURL={Mapbox.StyleURL.Street}
        logoEnabled = {false}
        attributionEnabled = {false} >
          <View>
        <Mapbox.Camera ref={(ref) => (this.camera = ref)}
          zoomLevel={15}
          centerCoordinate={this.state.ubicacion}
          animationDuration={2000} />
        <View ref={(ref) => (this.ubicacionActual = ref)}/>
          {this.state.MarcadorUbicacion}
          {this.state.Calles}
        </View>
      </Mapbox.MapView>
      </>
    )
  }
}
export default Mapa;

const styles = {
  container: {
    height: 600,
    width: 400,
    backgroundColor: "transparent"
  }
};
