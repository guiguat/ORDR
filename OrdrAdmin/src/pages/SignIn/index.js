import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, View, StyleSheet, TextInput, Text, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import {useAuth} from '../../contexts/auth';
import logo from '../../assets/logo-white.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const {signIn} = useAuth();

  function handleSignIn(){
    if(email !== "" && senha !== ""){
      signIn(email, senha);
    }
    else{
      Alert.alert('Erro:', 'Preencha os campos corretamente.');
    }
  }
  return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#1B5E9B" barStyle="light-content"/>
        <View style={styles.presentation}>
          <Image source={logo} style={styles.logo}/>
          <Text style={styles.subtitle}>
            Bem-vindo ao Sistema para Controle
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

          <Button color="#1B5E9B" title="Fazer Login" onPress={handleSignIn}/>

          <View style={[styles.row, {justifyContent:'space-between'}]}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Cadastro')}} style={styles.row}>
              <Text style={styles.cad}>Não tenho uma conta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('Config')}} style={styles.row}>
              <Icon name="settings" size={30} color="#44475A" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:"center",
    paddingHorizontal:0,
    backgroundColor: "#1B5E9B"
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
    fontFamily:"Poppins",
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
    fontFamily:"Poppins",
    fontWeight:"bold",
    color:'#44475A'
  },
  input:{
    fontSize:18,
    fontFamily:"Poppins",
    color:'#44475A'
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
  },
  config:{
    fontSize:18,
    fontFamily:"Poppins",
    fontWeight:"bold",
    color:"#6B6D75"
  },
  cad:{
    fontSize:18,
    fontFamily:"Poppins",
    fontWeight:"bold",
    color:"#282A36"
  }
})

export default SignIn;