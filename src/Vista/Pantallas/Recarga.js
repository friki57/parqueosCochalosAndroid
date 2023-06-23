import React, { Component } from "react";
import { View, Text, Alert, ImageBackground, Button, Image } from 'react-native';

import Images from "./../../Modelo/Img";
import Colors from "../../Modelo/Colors";
import Boton from "../Componentes/Formulario/Boton";

const qr = 0;
export default class Recarga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qr: 0
        }
        this.escogerQr = this.escogerQr.bind(this);
    }
    escogerQr(val) {
        this.setState({ qr: val });
    }
    render() {
        return (
            <ImageBackground source={Images.textura1} style={{ width: '100%', height: '100%' }} imageStyle={{ resizeMode: 'repeat' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 30, padding: 20, backgroundColor: Colors.azulAppT, borderRadius: 20 }}>
                    <Text>Tu saldo actual es de: {global.usuario.saldo} Bolivianos</Text>
                </View>
                {
                    this.state.qr === 0 ?
                        <View style={{ marginHorizontal: 50, padding: 20, backgroundColor: Colors.azulAppL, borderRadius: 20 }}>
                            <Text style={{ textAlign: 'center' }}>Seleecione un monto para realizar una recarga de saldo por QR:</Text>
                        </View>
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginHorizontal: 50, padding: 20, backgroundColor: Colors.azulAppL, borderRadius: 20 }}>
                                <Text style={{ textAlign: 'center' }}>Seleccionado QR par recarga de saldo de {this.state.qr} bolivianos</Text>
                            </View>
                            <Image source={Images["qr" + this.state.qr]} style={styles.image}></Image>
                        </View>

                }
                <View style={styles.buttonView}>
                    <Boton onPress={() => this.escogerQr(10)} style={{ ...styles.button, backgroundColor: Colors.rojoApp }} title="10 Bs"></Boton>
                    <Boton onPress={() => this.escogerQr(20)} style={{ ...styles.button, backgroundColor: Colors.amarilloApp }} title="20 Bs"></Boton>
                    <Boton onPress={() => this.escogerQr(50)} style={{ ...styles.button, backgroundColor: Colors.verdeApp }} title="50 Bs"></Boton>
                </View>
            </ImageBackground>
        );
    }
}

const styles = {
    buttonView: {
        margin: 10,
        flex: 0.2,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row"
    },
    button: {
        padding: 20,
        borderRadius: 10
    },
    image: {
        width: 350,
        height: 350,
        margin: 50,
    },
}