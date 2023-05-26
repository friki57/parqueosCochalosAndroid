import AsyncStorage from '@react-native-async-storage/async-storage';

function localStorage() {
    this.guardar = async (item, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(item, jsonValue)
        } catch (e) {
            console.log("Error guardando: ", item, value)
        }
    }
    this.leer = async (item, callback) => {
        try {
            const jsonValue = await AsyncStorage.getItem(item)
            callback(JSON.parse(jsonValue))
        } catch (e) {
            console.log("Error leyendo: ", item)
            callback({});
        }
    }
    this.eliminar = async (item, callback) => {
        try {
            await AsyncStorage.removeItem(item)
            console.log('Eliminando: ', item)
            callback();
        } catch (e) {
            console.log("Error eliminando: ", item)
        }

    }
}

module.exports = new localStorage();
