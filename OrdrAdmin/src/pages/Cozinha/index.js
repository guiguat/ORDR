import React, {useState, useEffect} from 'react';
import { View, StatusBar, StyleSheet, ScrollView, Text } from 'react-native';
import * as api from 'axios';
import {useAuth} from '../../contexts/auth';
import Pedido from './Pedido';
import Button from '../../components/Button';

const Cozinha = () => {
  const [pedidos, setPedidos] = useState([]);
  const {baseURL, reloadCozinha, setReloadCozinha} = useAuth();
  useEffect(()=>{
    async function getPedidos(){
      try{
        const response = await api.get(`${baseURL}/pedido`);
        setPedidos(response.data);
      }
      catch(err){
          console.log(err);
          alert('Erro ao conectar-se com o servidor');
      }
    }
  getPedidos();
  },[]);
  useEffect(()=>{
    async function getPedidos(){
      try{
        const response = await api.get(`${baseURL}/pedido`);
        setPedidos(response.data);
      }
      catch(err){
          console.log(err);
          alert('Erro ao conectar-se com o servidor');
      }
    }
    getPedidos();
  },[reloadCozinha]);

  return(
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar backgroundColor="#003959"/>
        <Button style={{borderRadius:0, marginTop:0}} color="#003959" title="Atualizar" onPress={()=>{setReloadCozinha(!reloadCozinha)}}/>
        <View style={styles.containerNav}>
          <Text style={styles.item}>NUM.</Text>
          <Text style={styles.item}>PEDIDO</Text>
          <Text style={styles.item}>MESA</Text>
          <Text style={[styles.item,{color:"#B92727"}]}>Deletar</Text>
        </View>
        {
          pedidos.map((pedido, index)=><Pedido key={index} data={pedido}/>)
        }
      </ScrollView>   
    );
}

const styles = StyleSheet.create({
  containerNav:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
    paddingVertical:10,
    paddingHorizontal:5
  },
  container:{
    flex:1
  },
  item:{fontFamily:'Poppins',fontSize:18, fontWeight:'bold'}
});

export default Cozinha;