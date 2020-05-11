import React, { useState } from 'react';
import { SafeAreaView, Keyboard, KeyboardAvoidingView, View, StyleSheet, TextInput, Text, Image, StatusBar, Alert } from 'react-native';
import {useAuth} from '../../contexts/auth';
import logo from '../../assets/logo-white.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';

const Cadastro = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const {createUser} = useAuth();

  function handleCreate(){
    if(email !== "" && senha !== ""){
      createUser(email, senha);
      setEmail('');
      setSenha('');
      Keyboard.dismiss();
    }
    else{
      Alert.alert('Erro:', 'Preencha os campos corretamente.');
    }
  }
  return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#43A521" barStyle="light-content"/>
        <View style={styles.presentation}>
          <Image source={logo} style={styles.logo}/>
          <Text style={styles.subtitle}>
            Entre para o Sistema para Controle
            de Pedidos feito para o seu restaurante
          </Text>
        </View>
        <KeyboardAvoidingView behavior="height" style={styles.form}>
          <Text style={styles.label}>Email:</Text>
          <View style={styles.inputWrapper}>
            <TextInput autoCapitalize='none'
              keyboardType="email-address" 
              style={styles.input} 
              placeholder="Seu melhor email" 
              value={email} 
              onChangeText={text=>setEmail(text)}
            />
            <Icon name="email" size={18} color="#8D8D94" />
          </View>

          <Text style={styles.label}>Senha:</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              secureTextEntry={true} 
              autoCapitalize='none'  
              placeholder="Sua senha" 
              value={senha} 
              onChangeText={text=>setSenha(text)}
            />
            <Icon name="lock" size={18} color="#8D8D94" />
          </View>

          <Button title="Cadastrar-se" onPress={handleCreate} color="#43A521"/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:"center",
    paddingHorizontal:0,
    backgroundColor: "#43A521"
  },
  form:{
    flex:1, 
    paddingHorizontal:30,
    paddingTop:40,
    backgroundColor: "#FFFF",
    borderTopLeftRadius:30,
    borderTopRightRadius:30
  },
  presentation:{
    padding:40
  },
  subtitle:{
    color:"#FFFF",
    fontFamily:'Poppins',
    fontSize:18
  },
  logo:{
    height:36,
    resizeMode:"contain",
    alignSelf:"center",
    marginBottom:20
  },
  label:{
    fontSize:18,
    fontWeight:"bold",
    fontFamily:'Poppins',
    color:'#44475A'
  },
  input:{
    fontSize:18,
    fontFamily:'Poppins',
    fontWeight:"bold",
    flex:1
  },
  inputWrapper:{
    borderWidth:2,
    borderColor:'#E1E1E1',
    paddingHorizontal:10,
    borderRadius:6,
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10,
    marginTop:5
  },
  row:{
    flexDirection:"row",
    alignItems:"center",
    marginTop:20
  }
})

export default Cadastro;