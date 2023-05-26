import React, { Component, Fragment } from 'react';
import { TouchableOpacity, ToastAndroid, Text, Linking, View, Image, ImageBackground, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle';

class Scan extends Component {
    leyo = false;
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
        this.leyo = false;
    }
    volver = () => {
        this.props.volver();
    } 
    onSuccess = (e) => {
        if(this.leyo===true) return;
        const check = e.data.substring(0, 19);
        console.log('scanned data' + check);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        console.log("555555555555555555555555555")
        console.log("QR escaneando: ", e.data);
        console.log("555555555555555555555555555")
        if (check === 'parqueosCochalos://') {
            this.leyo = true;
            console.log("Es un QR oficial de parqueos cochalos")
            global.qr = e.data;
            this.volver();
            //Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        } else {
            //ToastAndroid.show("¡Este QR no es uno de parqueos cochalos!", ToastAndroid.SHORT);
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            })
        }
    }
    activeQR = () => {
        this.setState({ scan: true })
    }
    scanAgain = () => {
        this.setState({ scan: true, ScanResult: false })
    }
    render() {
        const { scan, ScanResult, result } = this.state
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.volver()}>
                            <Image source={require('./back.png')} style={{ height: 36, width: 36 }}></Image>
                        </TouchableOpacity>
                        <Text style={styles.textTitle}>Scan QR Code</Text>
                    </View>
                    {!scan && !ScanResult && false &&
                        <View style={styles.cardView} >
                            <Image source={require('./camera.png')} style={{ height: 36, width: 36 }}></Image>
                            <Text numberOfLines={8} style={styles.descText}>Please move your camera {"\n"} over the QR Code</Text>
                            <Image source={require('./qr-code.png')} style={{ margin: 20 }}></Image>
                            <TouchableOpacity onPress={this.activeQR} style={styles.buttonScan}>
                                <View style={styles.buttonWrapper}>
                                    <Image source={require('./camera.png')} style={{ height: 36, width: 36 }}></Image>
                                    <Text style={{ ...styles.buttonTextStyle, color: '#2196f3' }}>Scan QR Code</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    {ScanResult && false &&
                        <Fragment>
                            <Text style={styles.textTitle1}>Result</Text>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>Type : {result.type}</Text>
                                <Text>Result : {result.data}</Text>
                                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                        <Image source={require('./camera.png')} style={{ height: 36, width: 36 }}></Image>
                                        <Text style={{ ...styles.buttonTextStyle, color: '#2196f3' }}>Click to scan again</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Fragment>
                    }
                    {(scan || true) &&
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            topContent={
                                <Text style={styles.centerText}>
                                    Por favor apunta al código {"\n"} QR de la calle con tu cámara 
                                </Text>
                            }
                            bottomContent={
                                <View>
                                    {/* <ImageBackground source={require('./back.png')} style={styles.bottomContent}>
                                        <TouchableOpacity style={styles.buttonScan2}
                                            onPress={() => this.scanner.reactivate()}
                                            onLongPress={() => {
                                                    this.setState({ scan: false })
                                                }}>
                                            <Image source={require('./camera.png')} style={{ height: 36, width: 36 }}></Image>
                                        </TouchableOpacity>
                                    </ImageBackground> */}
                                </View>
                            }
                        />
                    }
                </Fragment>
            </View>
        );
    }
}
export default Scan;