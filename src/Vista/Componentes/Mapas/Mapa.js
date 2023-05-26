import React, { Component } from "react";
import { View, Text, Alert } from 'react-native';
//import Text from "./Text"
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import SocketIOClient from 'socket.io-client/dist/socket.io.js'

const dominio = "http://83.229.86.168:5000"

const colores = {
  rojo: "#f46",
  verde: "#6f4",
  azul: "#36f",
  amarillo: "#000",
  tan: "#D2B48C"
}
/* Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken("pk.eyJ1IjoiZnJpa2k1NyIsImEiOiJjanZxOGtxMjgwaDhxNDRvOHl5NDVvZnQyIn0._cULjNb2IP5SLSBSm7Higw");
Mapbox.setConnected(true); */

class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ubicacion: this.props.ubicacion,
      ubicacionActual: [-66.1556638449178, -17.389506188021315],
      MarcadorUbicacion: undefined,
      Calles: undefined,
      color: "tan",
      select: undefined,
      listaCalles: []
    }
    this.actualizar = this.actualizar.bind(this);
    this.textoSeleccionado = this.textoSeleccionado.bind(this);
    setTimeout(() => {
      this.socket = SocketIOClient(dominio, { transports: ['websocket'], jsonp: false });
      this.socket.connect();
      this.socket.on('calles', (res) => {
        this.actualizar(res)
      });
    }, 1000)
    Geolocation.getCurrentPosition(
      posicion => {
        const ubicacion = (posicion);

        this.setState({
          ubicacionActual:
            [ubicacion.coords.longitude,
            ubicacion.coords.latitude]
        });
        if (this.state.ubicacion == undefined) {
          this.setState({ ubicacion: this.state.ubicacionActual })
        }
        this.setState(
          { MarcadorUbicacion: (<Marker coordinate={{ latitude: this.state.ubicacionActual[1], longitude: this.state.ubicacionActual[0] }} pinColor={this.state.color} key={this.state.color} color={colores.amarillo} id="aca" ubicacion={this.state.ubicacion} texto="Usted está acá"
          title="Usted está aquí"
            onPress={() => { this.setState({ select: "tu" }, () => console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", this.state.select)) }}
          ></Marker>) }
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
  actualizar(data) {
    this.setState({ Calles: undefined })
    data = data.filter(a => a != undefined)
    data = data.filter(a => a.geojson != undefined)
    data = data.map(
      (a) => {
        //console.log("1234", a)
        a.lon = (a.geojson[0].lon + a.geojson[1].lon) / 2;
        a.lat = (a.geojson[0].lat + a.geojson[1].lat) / 2;
        if (a.placas != undefined)
          a.placas = a.placas.map(b => {
            b.tiempoRestante = Math.floor((new Date(b.hora) - Date.now() + b.tiempo * 60 * 1000) / (1000));
            b.tiempopl = ((b.tiempoRestante > 60) ? Math.floor((b.tiempoRestante / 60).toString()) : "menos de 1");
            return b
          })
        return a;
      }
    )
    /*     console.log("----------------------------------")
        console.log(data)
        console.log("----------------------------------") */
    const colorear = (a)=> {
      var placas = "";
      if (a.placas != undefined) {
        //console.log("AAAA",a.placas);
        a.placasTiempo = a.placas.map(b => {
          //placas = placas + b.placa + " : " + b.tiempopl + " minutos restantes\n"
          return b.tiempopl
        })
        a.proximo = "Parqueo nuevo disponible en " + a.placasTiempo.sort()[0] + " minutos";
      }
      var colorp = colores.rojo
      if (a.pago == false) {
        colorp == colores.rojo;
      }
      else {
        if (a.espacios == a.espaciosMaximo)
          colorp = colores.azul;
        else {
          colorp = colores.verde;
        }
        }
      a.colorp = colorp;
      a.calleCom = (a.calle + " entre " + a.c1 + " y " + a.c2)
      return a;
    }
    var marcadores = data.map((a, i) => {
      if (a.espacios != undefined) {
        a = colorear(a);

        return (
          <Marker coordinate={{ latitude: a.lat, longitude: a.lon }} pinColor={a.colorp} key={i.toString() + " " + a.colorp}
            onPress={() => { this.setState({ select: a }, () => console.log("click", this.state.select)) }}
          ></Marker>
          /*             <Text id={i.toString()} color={colorp} ubicacion = {[a.lon, a.lat]} texto={(a.calle+" entre "+a.c1+" y "+a.c2)} key = {i.toString()}></Text> */
        )
      }
    })
    var marcadoresVar = data.map((a, i) => {
      if (a.espacios != undefined) {
        a = colorear(a);
        return a;
      }
    })


    this.setState(
      {
        Calles: marcadores, listaCalles: marcadoresVar
      }, () => {
        //console.log("------------sd:", this.state.MarcadorUbicacion, this.state.Calles)
      }
    )
  }
  textoSeleccionado(){
    if(this.state.select===undefined) {
      return (
        <>
          <Text>Seleccione un punto para ver su información</Text>
        </>
      )
    }
    if(this.state.select === "tu"){
      return (
        <>
          <Text>Usted está aquí</Text>
        </>
      )
    } else {
      const selected = this.state.listaCalles.find(ca=>ca.key===this.state.select.key)
      console.log("___________________________________________________________________________________________________________________________________________________________________________")
      console.log("selected, this.state.select, this.state.listaCalles")
      console.log(selected/* , this.state.select, this.state.listaCalles */)
      console.log("___________________________________________________________________________________________________________________________________________________________________________")
      if(selected.pago){
        return (
          <>
            <Text>Calle: {selected.calleCom}</Text>
            <Text>Espacios disponibles: {selected.espaciosMaximo - selected.espacios}</Text>
            {selected.proximo?<Text>{selected.proximo}</Text>:<></>}
          </>
        )
      } else {
        return (
          <>
            <Text>Calle: {selected.calleCom}</Text>
            <Text>ESTA ES UNA CALLE PROHIBIDA PARA ESTACIONAMIENTO</Text>
          </>
        )
      }
      
    }
    

  }
  render() {
    return (
      <>
        <View style={{ width: 393, height: 500, backgroundColor: "#456" }}>
          <MapView style={{ flex: 1 }}
            initialRegion={{
              latitude: this.state.ubicacionActual[1],
              longitude: this.state.ubicacionActual[0],
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            }}
          >
            {/* <Marker
              coordinate={{
                latitude: -17.389506188021315,
                longitude: -66.1556638449178,
              }}
            /> */}
            {/*             <Marker coordinate={{ latitude: this.state.ubicacionActual[1], longitude: this.state.ubicacionActual[0] }} pinColor={this.state.color} color={colores.amarillo} id="aca" ubicacion={this.state.ubicacion} texto="Usted está acá"></Marker> */}
            {this.state.MarcadorUbicacion}
            {this.state.Calles}

          </MapView>
        </View>
        <View key={this.state.select} style={{ width: 393, minHeight: 100, flex: 1, backgroundColor: "#456", justifyContent: 'center', alignItems: 'center' }}>
          {this.textoSeleccionado()}
        </View>
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
