import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as api from 'axios';
import {useAuth} from '../../contexts/auth';

const Pedido = ({data}) => {
    const {baseURL, setReloadCozinha, reloadCozinha} = useAuth();
    async function deletePedido(){
        try {
            const response = await api.delete(`${baseURL}/pedido?id=${data.id}`);
            Alert.alert('Mensagem:', response.data.message);
            if(response.data.message === "pedido(s) deletado(s) com sucesso"){
                setReloadCozinha(!reloadCozinha);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('ERRO:', 'Falha ao conectar-se com o servidor');
        }
    }
    return(
        <View style={styles.containerNav}>
            <Text style={styles.item}>{data.id}</Text>
            <Text style={styles.item}>{data.pedidos.toUpperCase()}</Text>
            <Text style={styles.item}>{data.mesa}</Text>
            <TouchableOpacity style={styles.controls} onPress={deletePedido}>
                <Icon name="remove-circle" size={36} color="#B92727"/>
            </TouchableOpacity>
        </View>
    );
}

const styles =  StyleSheet.create({
    containerNav:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'space-between',
        paddingVertical:10,
        paddingHorizontal:5
    },
    item:{
        fontSize:36,
        fontFamily:"Poppins",
        fontWeight:"bold",
        color: "#282A36"
    },
});

export default Pedido;