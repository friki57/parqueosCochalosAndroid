import React, { Component } from "react";
import { View,  Text } from 'react-native';
import Mapbox from '@rnmapbox/maps';

var conta = 0;

class Marcador extends Component
{
  constructor(props){
    super(props);
    this.state =
    {
      ubicacion : (this.props.ubicacion)?this.props.ubicacion:[0,0],
      color : (this.props.color)?this.props.color:'#00cccc',
      texto : (this.props.texto)?this.props.texto:''
    }
    console.log(this.props.id);
    setTimeout(()=>{
      conta = conta +1;
      this.setState({texto: this.state.texto + " " + conta})
    }, 1000)
  }
  render()
  {
    return (
        <Mapbox.PointAnnotation 
        key={this.props.id}
        id={this.props.id}
        coordinate={this.state.ubicacion}
        marker-color="#000000">
        <View style={{
                  height: 30,
                  width: 30,
                  backgroundColor: this.state.color,
                  borderRadius: 50,
                  borderColor: '#fff',
                  borderWidth: 3
        		}}>
					<View style={styles.annotationFill} />
				</View>
          <Mapbox.Callout title={this.state.texto} />
        </Mapbox.PointAnnotation>
    )
  }
}
export default Marcador;

const styles = {
  container: {
    height: 300,
    width: 300,
    backgroundColor: "transparent"
  }
};
