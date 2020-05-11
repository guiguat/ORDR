import React, { useState, useEffect } from 'react';
import { Keyboard,Image, View, StyleSheet, Alert, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import {useAuth} from '../../contexts/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import logo from '../../assets/logo-white.png';
//import api from '../../services/api';
import * as api from 'axios';

const Dashboard = ({navigation}) => {
  const {user, signOut, baseURL} = useAuth();
  const [caixa, setCaixa] = useState([]);

  useEffect(()=>{
    async function getCaixa(){
      try{
        const relatorios = await api.get(`${baseURL}/relatorio`);
        setCaixa(relatorios.data); 
      }
      catch(err){
        console.log(err);
        Alert.alert('Erro ao conectar-se com o servidor');
      }
    }
    getCaixa();
    
  },[])

  async function getCaixa(){
    try{
      const relatorios = await api.get(`${baseURL}/relatorio`);
      setCaixa(relatorios.data); 
    }
    catch(err){
      console.log(err);
      Alert.alert('Erro ao conectar-se com o servidor');
    }
  }

  async function abrirCaixa(){
    try{
      const relatorios = await api.post(`${baseURL}/relatorio`);
      setCaixa(relatorios.data);
    }
    catch(err){
      console.log(err);
      Alert.alert('Erro ao conectar-se com o servidor');
    }
  }

  function formatar(text) {
    const nova = text.split(' ');
    let dataAmericana = nova[0];
    dataAmericana.split();
    let novaData = `${dataAmericana[8]}${dataAmericana[9]}/${dataAmericana[5]}${dataAmericana[6]}`
    return novaData;
}

  return (
      <>
        <StatusBar backgroundColor="#1B5E9B" />
        <View style={styles.container}>
          <View style={{paddingHorizontal:20}}>
            <View style={styles.containerNav}>
              <Text style={{fontSize:16, fontWeight:'bold', color:'#FFFF'}}>{user.nome.toUpperCase()}</Text>
              <View style={styles.row}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Config')}} style={{marginRight:20}}>
                  <Icon name="settings" size={30} color="#FFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={signOut}>
                  <Icon name="exit-to-app" size={30} color="#FFFF" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.presentation}>
              <Image source={logo} style={styles.logo}/>
              <Text style={styles.subtitle}>
                Bem-vindo ao Sistema para Controle
                de Pedidos feito para o seu restaurante
              </Text>
            </View>
          </View>
          <View style={styles.below}>
            <View style={{paddingHorizontal:15}}>
              <Button style={{paddingVertical:10, marginTop:0}} color="#0E848B" title="Gerenciar Produtos" onPress={()=>{navigation.navigate('Produtos')}}/>
              <Button style={{paddingVertical:10, marginTop:10}} color="#003959" title="Cozinha" onPress={()=>{navigation.navigate('Cozinha')}}/>
            </View>
            <View style={styles.rowButtons}>
              <TouchableOpacity onPress={getCaixa} style={{alignItems:"center",marginRight:10,marginTop:3}}>
                <Icon name="autorenew" size={36} color="#1B5E9B"/>
              </TouchableOpacity>
              <Button style={{paddingVertical:10, flex:1, marginTop:0}} color="#1B5E9B" title="Abrir Caixa" onPress={abrirCaixa}/>
            </View>
          
            <View style={styles.containerNav}>
              <Text style={{fontSize:16, fontWeight:'bold'}}>DATA</Text>
              <Text style={{fontSize:16, fontWeight:'bold'}}>DEBITO</Text>
              <Text style={{fontSize:16, fontWeight:'bold'}}>CREDITO</Text>
              <Text style={{fontSize:16, fontWeight:'bold'}}>DINHEIRO</Text>
              <Text style={{fontSize:16, fontWeight:'bold'}}>TOTAL</Text>
            </View>
            <FlatList
              data={caixa}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
              <View style={styles.containerNav}>
                <Text style={styles.item}>{formatar(item.dataHora)}</Text>
                <Text style={styles.item}>{item.debito}</Text>
                <Text style={styles.item}>{item.credito}</Text>
                <Text style={styles.item}>{item.dinheiro}</Text>
                <Text style={styles.id}>{`R$${item.total}`}</Text>
              </View>
              )}
            />
          </View>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
  presentation:{
    paddingBottom:30,
    paddingHorizontal:30,
    paddingTop:10
  },
  subtitle:{
    color:"#FFFF",
    fontFamily:"Poppins",
    fontSize:18
  },
  logo:{
    height:36,
    resizeMode:"contain",
    alignSelf:"center",
    marginBottom:20
  },
  container:{
    flex:1, 
    justifyContent:"center",
    backgroundColor: "#1B5E9B"
  },
  containerNav:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
    paddingVertical:10
  },
  item:{
    fontSize:16,
    fontFamily:"Poppins",
    fontWeight:"500",
    color: "#282A36"
  },
  id:{
    fontSize:16,
    fontWeight:"bold",
    fontFamily:"Poppins",
    color: "#282A36"
  },
  rowButtons:{
    flexDirection:"row",
    marginTop:35,
    paddingHorizontal:15,
    marginBottom:10,

  },
  refresh:{
    fontSize:18,
    fontWeight:"bold",
    fontFamily:"Poppins",
    color:"#43A521"
  },
  row:{
    flexDirection:'row',
    alignItems:'center'
  },
  below:{
    flex:1,
    backgroundColor:'#FFFF',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingHorizontal:5,
    paddingTop:30
  }
})

export default Dashboard;