
import React, {Component} from 'react';
import Scan from '../Componentes/Scan';
import Fetch from "../../Controlador/Utils/Fetch";

class Camara extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
    }
    render(){
        return (
            <Scan 
                volver={()=>{
                    console.log(global.qr);
                    if (global.qr !== undefined && global.qr !== false) {
                        const ruta = "/"+global.qr.split("://")[1].replace("{placa}", global.usuario.placa);
                        console.log(ruta);
        //          parqueosCochalos://QR/-M922VTwig1MVelTzdTc/{placa}
        //          parqueosCochalos://QR/-M921gcjh1jA_xFt5_T9/{placa}
        //          parqueosCochalos://QR/-M922rQMVy_Mttdm4PC3/{placa}
        //          parqueosCochalos://QR/-M923bXS_k-pwJAsmLJ3/{placa}
                        Fetch(ruta, (res) => {
                            console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
                            console.log(res)
                            this.props.navigation.navigate('Desplegables')
                        }, {}, "POST")
                    } else {
                        this.props.navigation.navigate('Desplegables')
                    }
                }}
            />
        );
    }
};
export default Camara;
