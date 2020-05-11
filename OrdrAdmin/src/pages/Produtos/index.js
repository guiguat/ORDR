import React, {useState, useEffect} from 'react';
import { View, FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../../contexts/auth';
import * as api from 'axios';

const Produtos = () => {
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [estoqueProduto, setEstoqueProduto] = useState(''); //parseInt
  const [tipoProduto, setTipoProduto] = useState('');
  const [codProduto, setCodProduto] = useState('');
  const [produtos, setProdutos] = useState([]);
  const {baseURL} = useAuth();

  useEffect(()=>{
    async function getProdutos(){
      try{
        const response = await api.get(`${baseURL}/produto`);
        setProdutos(response.data);
      }
      catch(err){
        alert('Erro ao se conectar com o servidor');
        console.log(err);
      }
    }
    getProdutos();
  },[]);

  async function getProdutos(){
    try{
      const response = await api.get(`${baseURL}/produto`);
      setProdutos(response.data);
    }
    catch(err){
      alert('Erro ao se conectar com o servidor');
      console.log(err);
    }
  }

  async function createProduto(){
    Keyboard.dismiss();
    if(nomeProduto!=="" && precoProduto !== "" && estoqueProduto !== ""){
      try{
        const data = {
          nome:nomeProduto,
          preco:parseFloat(precoProduto),
          estoque:parseInt(estoqueProduto),
          tipo:tipoProduto
        }
        setCodProduto('');
        setNomeProduto('');
        setPrecoProduto('');
        setEstoqueProduto('');
        setTipoProduto('');
        const create = await api.post(`${baseURL}/produto`, data);
        Alert.alert(create.data.message);
        getProdutos();
      }
      catch(err){
        console.log(err);
        Alert.alert('Erro ao conectar-se com o servidor');
      }
    }
    else{
      Alert.alert("Erro:", "Preencha os campos corretamente");
    }
  }
  async function deleteProduto(){
    Keyboard.dismiss();
    if(codProduto !== ""){
      try{
        setCodProduto('');
        setNomeProduto('');
        setPrecoProduto('');
        setEstoqueProduto('');
        setTipoProduto('');
        const resp = await api.delete(`${baseURL}/produto?id=${codProduto}`);
        Alert.alert(resp.data.message);
        getProdutos();
      }
      catch(err){
        console.log(err);
        Alert.alert('Erro ao conectar-se com o servidor');
      }
    }
    else{
      Alert.alert("Erro:", "Preencha os campos corretamente");
    }
  }

  async function editProduto(){
    if(nomeProduto!=="" && precoProduto !== "" && estoqueProduto !== ""&&codProduto!==""){
      try{
        const data = {
          id:codProduto,
          nome:nomeProduto,
          preco:parseFloat(precoProduto),
          estoque:parseInt(estoqueProduto),
          tipo:tipoProduto
        }
        setCodProduto('');
        setNomeProduto('');
        setPrecoProduto('');
        setEstoqueProduto('');
        setTipoProduto('');
        console.log(data);
        const edit = await api.put(`${baseURL}/produto`, data);
        Alert.alert(edit.data.message);
        getProdutos();
        Keyboard.dismiss();
      }
      catch(err){
        console.log(err);
        Alert.alert('Erro ao conectar-se com o servidor');
      }
    }
    else if(tipoProduto==="" && nomeProduto==="" && precoProduto === "" && estoqueProduto !== "" && codProduto !== ""){
      try{
        const data = {
          estoque:parseInt(estoqueProduto),
          id:codProduto
        }
        setCodProduto('');
        setEstoqueProduto('');
        const edit = await api.put(`${baseURL}/produto/estoque`, data);
        Alert.alert(edit.data.message);
        getProdutos();
        Keyboard.dismiss();
      }
      catch(err){
        console.log(err);
        Alert.alert('Erro ao conectar-se com o servidor');
      }
    }
    else{
      Alert.alert("Erro:", "Preencha os campos corretamente");
    }
  }

  return (
    <>
      <StatusBar backgroundColor="#0E848B"/>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.h1}>Cadastrar Produto</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput 
              style={styles.input}
              placeholder="Nome do Produto" 
              value={nomeProduto} 
              onChangeText={text=>setNomeProduto(text)}
            />
          </View>
          <View style={styles.row}>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Preço:</Text>
              <TextInput 
                style={styles.input}
                placeholder="Preço do Produto" 
                keyboardType="decimal-pad"
                value={precoProduto} 
                onChangeText={text=>setPrecoProduto(text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Estoque:</Text>
              <TextInput 
                style={styles.input}
                placeholder="Valor em Estoque" 
                keyboardType="decimal-pad"
                value={estoqueProduto} 
                onChangeText={text=>setEstoqueProduto(text)}
              />
            </View>

            <View style={[styles.inputContainer,{ flex:1} ]}>
              <Text style={styles.label}>Tipo:</Text>
              <Picker
                selectedValue={tipoProduto}
                onValueChange={itemValue => setTipoProduto(itemValue)}
              >
                <Picker.Item label="Tipo do Produto" value="" />
                <Picker.Item label="Prato" value="prato" />
              </Picker>
            </View>

          </View>
          <View style={styles.row}>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Código(Del/Edit):</Text>
              <TextInput 
                style={styles.input}
                placeholder="Código do Produto" 
                value={codProduto} 
                keyboardType="decimal-pad"
                onChangeText={text=>setCodProduto(text)}
              />
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.controls} onPress={createProduto}>
                <Icon name="add-circle" size={36} color="#43A521"/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controls} onPress={editProduto}>
                <Icon name="create" size={36} color="#D6A11B"/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controls} onPress={deleteProduto}>
                <Icon name="delete" size={36} color="#B92727"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.containerNav}>
          <Text style={{fontSize:16, fontWeight:'bold'}}>Cód.</Text>
          <Text style={{fontSize:16, fontWeight:'bold'}}>Nome</Text>
          <Text style={{fontSize:16, fontWeight:'bold'}}>Preço</Text>
          <Text style={{fontSize:16, fontWeight:'bold'}}>Estoque</Text>
          <Text style={{fontSize:16, fontWeight:'bold'}}>Tipo</Text>
        </View>
        <FlatList
          data={produtos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
          <View style={styles.containerNav}>
            <Text style={styles.item}>{item.id}</Text>
            <Text style={styles.item}>{item.nome}</Text>
            <Text style={styles.item}>{`R$${parseFloat(item.preco).toFixed(2)}`}</Text>
            <Text style={styles.item}>{item.estoque}</Text>
            <Text style={styles.item}>{`${item.tipo?item.tipo.toUpperCase():"NULL"}`}</Text>
          </View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:0,
    margin:0
  },
  containerNav:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
    paddingVertical:10,
    paddingHorizontal:5
  },
  item:{
    fontSize:16,
    fontFamily:"Poppins",
    fontWeight:"500",
    color: "#282A36"
  },
  row:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  input:{
    fontFamily:'Poppins',
    fontSize:16,
    fontWeight:"500",
    color:"#282A36",
    borderRadius:6,
    borderWidth:2,
    borderColor:'#E1E1E1',
    paddingLeft:10,
    paddingVertical:8,
  },
  form:{
    padding:20,
  },
  inputContainer:{
    marginVertical:5,
    marginRight:10
  },
  controls:{
    marginHorizontal:10,
    paddingTop:20
  },
  label:{
    fontFamily:'Poppins',
    fontSize:16,
    fontWeight:"500",
    color:"#282A36",
    marginBottom:3
  },
  h1:{
    fontFamily:'Poppins',
    fontSize:24,
    fontWeight:"bold",
    color:"#282A36",
    marginBottom:10
  }
});

export default Produtos;