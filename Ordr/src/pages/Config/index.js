import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Keyboard, StatusBar } from 'react-native';
import {useAuth} from '../../contexts/auth';
import Button from '../../components/Button';

const Config = () => {
    const {baseURL, changeBaseURL} = useAuth();
    const [newIp, setNewIp] = useState('');
    const [showButton, setShowButton] = useState(false);

    function handleChange(){
        if(newIp !== ''){
            changeBaseURL(newIp);
            setNewIp('');
            setShowButton(false);
        }
        else{
            Alert.alert('Erro:','Preencha o campo IP corretamente');
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#282A36" />
            <Text style={styles.h1}>Conexão</Text>
            <Text style={styles.ipBefore}>
                IP Atual: <Text style={styles.ip}>{baseURL}</Text>
            </Text>
            <TextInput
                autoCapitalize='none'
                style={styles.input}
                placeholder="BaseURL do Servidor"
                value={newIp}
                onChangeText={text=>setNewIp(text)}
            />
            { showButton?null:<Button color='#282A36' title="Alterar URL" onPress={()=>{Keyboard.dismiss();setShowButton(true)}}/>}
            { showButton?<Button color='#C62828' title="Tem certeza disso?" onPress={handleChange}/>:null}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },
    h1:{
        color: '#282A36',
        fontSize:36,
        fontWeight:"bold",
        fontFamily:"Poppins",
        marginBottom:30
    },
    ipBefore:{
        color: '#282A36',
        fontSize:18,
        fontFamily:"Poppins",
        fontWeight:"bold",
        marginBottom:30
    },
    ip:{
        color: "#43A521",
        fontSize:18,
        fontFamily:"Poppins",
        fontWeight:"bold",
    },
    input:{
        fontSize:18,
        borderWidth:2,
        borderColor:'#E1E1E1',
        fontFamily:"Poppins",
        fontWeight:'500',
        paddingHorizontal:10,
        borderRadius:6,
    },
    beforeStyle:{
        display:"flex"
    },
    deleteStyle:{
        
    }
});

export default Config;