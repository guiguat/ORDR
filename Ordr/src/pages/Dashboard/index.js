import React, { useState, useEffect } from 'react';
import { Keyboard, View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, FlatList, StatusBar } from 'react-native';
import {useAuth} from '../../contexts/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
//import api from '../../services/api';
import * as api from 'axios';

const Dashboard = ({navigation}) => {
  const {user, signOut, baseURL} = useAuth();
  const [codPedido, setCodPedido] = useState('');
  const[pedidos, setPedidos] = useState([]);

  useEffect(()=>{
    async function getPedidos(){
      const resp = await api.get(`${baseURL}/funcionario?user=${user.nome}`);
      setPedidos(resp.data);
    }
    try {
      getPedidos();
    } catch (error) {
      console.log(error);
      Alert.alert('Temos um problema :(','Erro ao conectar-se com o servidor')
    }
  },[])

  async function getPedidos(){
    try {
      const resp = await api.get(`${baseURL}/funcionario?user=${user.nome}`);
      setPedidos(resp.data);
    } catch (error) {
      console.log(error);
      Alert.alert('Temos um problema :(','Erro ao conectar-se com o servidor')
    }
  }

  async function delPedidos(){
    try {
      const resp = await api.delete(`${baseURL}/funcionario?id=${codPedido}`);
      Alert.alert("Mensagem:",resp.data.message);
      setCodPedido('');
      getPedidos();
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
      Alert.alert('Temos um problema :(','Erro ao conectar-se com o servidor')
    }
  }

  function capitalize(prop) {
    return prop.charAt(0).toUpperCase() + prop.slice(1);
  }

  return (
      <>
        <StatusBar backgroundColor="#43A521" />
        <View style={styles.container}>
          <View style={{paddingHorizontal:20}}>
            <View style={styles.containerNav}>
              <Text style={{fontSize:16, fontFamily:'Poppins',fontWeight:'bold', color:'#FFFF'}}>{user.nome.toUpperCase()}</Text>
              <View style={styles.row}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Config')}} style={{marginRight:20}}>
                  <Icon name="settings" size={30} color="#FFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={signOut}>
                  <Icon name="exit-to-app" size={30} color="#FFFF" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.controls}>
              <TouchableOpacity style={styles.btnIcons}onPress={() => navigation.navigate('Venda')}>
                <Icon name="shopping-cart" size={80} color="#FFFF" />
                <Text style={styles.labelWhite}>VENDER</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => navigation.navigate('Contas')} style={styles.btnIcons}>
                <Icon name="person" size={80} color="#FFFF" />
                <Text style={styles.labelWhite}>CONTAS</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.below}>
            <View style={styles.deletes}>
              <Text style={styles.labelH1}>Meus pedidos:</Text>
              <TextInput keyboardType="decimal-pad"
              style={styles.input} 
              placeholder="Cod:" 
              value={codPedido} 
              onChangeText={text=>setCodPedido(text)}/>
              <Button style={{paddingVertical:10}} color="#43A521" title="Finalizar" onPress={delPedidos}/>
            </View>

            <TouchableOpacity onPress={getPedidos} style={{flexDirection:"row", alignItems:"center"}}>
              <Icon name="autorenew" size={24} color="#43A521"/>
              <Text style={styles.refresh}>Atualizar</Text>
            </TouchableOpacity>

            <View style={styles.containerNav}>
              <Text style={{fontSize:18,fontFamily:'Poppins', fontWeight:'bold'}}>COD</Text>
              <Text style={{fontSize:18,fontFamily:'Poppins', fontWeight:'bold'}}>PRODUTO</Text>
              <Text style={{fontSize:18,fontFamily:'Poppins', fontWeight:'bold'}}>MESA</Text>
            </View>
            <FlatList
              data={pedidos}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
              <View style={styles.containerNav}>
                <Text style={styles.id}>{item.id}</Text>
                <Text style={styles.item}>{capitalize(item.pedidos)}</Text>
                <Text style={styles.item}>{item.mesa}</Text>
              </View>
              )}
            />
          </View>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:"center",
    backgroundColor: "#43A521"
  },
  containerNav:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
    paddingVertical:20
  },
  controls:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",
    marginBottom:40
  },
  label:{
    fontSize:18,
    fontWeight:"bold",
    fontFamily:'Poppins',
    color: "#282A36"
  },
  labelH1:{
    fontSize:24,
    fontWeight:"bold",
    fontFamily:'Poppins',
    color: "#282A36"
  },
  labelWhite:{
    fontSize:18,
    fontWeight:"bold",
    fontFamily:'Poppins',
    color: "#FFFF"
  },
  input:{
    fontSize:18,
    borderBottomWidth:3,
    borderColor: "#43A521",
    fontFamily:'Poppins',
    fontWeight:"500",
    marginBottom:0
  },
  item:{
    fontSize:18,
    fontWeight:"bold",
    fontFamily:'Poppins',
    color: "#282A36"
  },
  id:{
    fontSize:18,
    fontWeight:"bold",
    fontFamily:'Poppins',
    color: "#282A36"
  },
  deletes:{
    marginBottom:30,
    paddingHorizontal:10
  },
  refresh:{
    fontSize:18,
    fontWeight:"bold",
    fontFamily:'Poppins',
    color:"#43A521"
  },
  btnIcons:{
    alignItems:"center",
    justifyContent:"center"
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
    paddingHorizontal:20,
    paddingTop:30
  }
})

export default Dashboard;