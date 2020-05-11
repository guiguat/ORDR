import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView,Alert, Keyboard } from 'react-native';
import Button from '../../components/Button';
import * as api from 'axios';
import ContaComponent from './ContaComponent';
import {useAuth} from '../../contexts/auth';

const Contas = ({navigation}) => {
    const {baseURL} = useAuth();
    const [nomeCliente, setNomeCliente] = useState('');
    const [docCliente, setDocCliente] = useState('');
    const [clientes, setClientes] = useState([]);

    useEffect(()=>{
        async function getClientes(){
            try {
                const response = await api.get(`${baseURL}/cliente`);
                setClientes(response.data);
            } catch (error) {
                console.log(error);
                Alert.alert('Erro ao conectar-se com o servidor');
            }
        }
        getClientes();
    },[]);
    async function getClientes(){
        try {
            const response = await api.get(`${baseURL}/cliente`);
            setClientes(response.data);
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao conectar-se com o servidor');
        }
    }
    async function handleCadCliente(){
        try {
            if(docCliente !== "" && nomeCliente !== ""){
                const data = {
                  nome:nomeCliente,
                  documento:docCliente
                }
                const response = await api.post(`${baseURL}/cliente`, data);
                Alert.alert(response.data.message);
                Keyboard.dismiss();
                setDocCliente('');
                setNomeCliente('');
                getClientes();
            }
            else{
            Alert.alert('Atenção!','Preencha todos os campos para cadastrar');
            }
        } catch (error) {
            console.log(error),
            Alert.alert('Ocorreu um erro!', "Erro ao conectar-se com o servidor.")
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={[styles.h1,{color:"#FFFF"}]}>Novo cliente:</Text>
                <View style={styles.col}>
                    <Text style={styles.labelWhite}>Cliente:</Text>
                    <TextInput 
                        style={styles.input}
                        autoCapitalize="words"
                        placeholder="Nome do cliente:"
                        placeholderTextColor="#FFF"
                        value={nomeCliente} 
                        onChangeText={text=>setNomeCliente(text)}
                        autoCorrect={false}
                    />
                </View>
                <View style={[styles.col,{marginBottom:0}]}>
                    <Text style={styles.labelWhite}>Documento:</Text>
                    <TextInput 
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Documento do cliente:"
                        placeholderTextColor="#FFF" 
                        value={docCliente} 
                        onChangeText={text=>setDocCliente(text)}
                        autoCorrect={false}
                    />
                </View>
                <Button title="Cadastrar" color="#1D5C06" onPress={handleCadCliente}/>
            </View>
            <View style={styles.contas}>
                <Text style={[styles.h1,{marginHorizontal:30}]}>Contas Abertas</Text>
                {
                    clientes.map((cliente, index)=>(
                        <ContaComponent key={index} name={cliente.nome} id={cliente.id} documento={cliente.documento} navigation={navigation}/>
                    ))
                }
            </View>
            
        </ScrollView>
     
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:0,
        backgroundColor:'#FFFF'
    },
    input:{
        borderRadius:6,
        fontFamily:'Poppins',
        paddingVertical:10,
        color:"#8D8D94",
        fontSize:18,
        fontWeight:'500',
        paddingHorizontal:20,
        marginTop:10,
        backgroundColor:'#257709',
    },
    row:{
        flexDirection:"row",
        marginBottom:30,
        justifyContent:"space-between"
    },
    col:{
        justifyContent: "space-between",
        marginBottom:20
    },
    h1:{
        marginBottom:10,
        fontSize:24,
        fontFamily:'Poppins',
        color:"#282A36",
        fontWeight:"bold"
    },
    label:{
        fontWeight:"bold",
        fontFamily:'Poppins',
        color:"#282A36",
        fontSize:18
    },
    labelWhite:{
        fontWeight:"bold",
        fontFamily:'Poppins',
        color:"#FFFF",
        fontSize:18
    },
    form:{
        marginBottom:0,
        padding:20,
        paddingBottom:30,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        backgroundColor:"#43A521"
    },
    contas:{
        margin:0,
        padding:0,
        backgroundColor:"#FFFF",
        paddingTop:20,
    }
});

export default Contas;