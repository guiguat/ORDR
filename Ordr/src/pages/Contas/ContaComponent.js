import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import * as api from 'axios';
import {useAuth} from '../../contexts/auth';

const ContaComponent = ({id, name, navigation, documento}) => {
    const {baseURL} = useAuth();
    const [pedidosCliente, setPedidosCliente] = useState([]);
    const [total, setTotal] = useState(0.00);
    useEffect(()=>{
        async function getData(){
          try {
            const response = await api.get(`${baseURL}/contas?cliente=${id.toString()}`);
            setPedidosCliente(response.data);
            let totalPrice = 0.00;
            response.data.map(item=>totalPrice+=parseFloat(item.preco));
            setTotal(totalPrice);
          } catch (error) {
            console.log(error);
          }
        }
        getData();
    },[])

    async function deleteConta(){
      try {
        const response = await api.delete(`${baseURL}/contas?cliente=${id}`);
        Alert.alert(response.data.message);
        navigation.navigate('Dashboard');
      } catch (error) {
        console.log(error);
      }
    }
    async function deleteCliente(){
      try {
        deleteConta();
        const response = await api.delete(`${baseURL}/cliente?id=${id}`);
        alert(response.data.message);
        navigation.navigate('Dashboard');
      }
      catch (error) {
        console.log(error);
        alert('Erro ao conectar-se com o servidor');
      }
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.name}>{name}</Text>
              <TouchableOpacity onPress={deleteCliente}>
                <Icon name="remove-circle" size={24} color="#C62828" />
              </TouchableOpacity>
            </View>
            <Text style={styles.doc}>{documento}</Text>
            <View style={styles.list}>
              {
                pedidosCliente.map((item,index)=>(
                  <View key={index} style={styles.containerNav}>
                    <Text style={styles.item}>{item.pedido.toUpperCase()}</Text>
                    <Text style={styles.item}>{`R$${parseFloat(item.preco).toFixed(2)}`}</Text>
                  </View>
                ))
              }
            </View>

            <Text style={styles.label}>TOTAL: R$<Text style={styles.total}>{`${total.toFixed(2)}`}</Text></Text>
            <Button style={{paddingVertical:10}} title="Finalizar" color="#43A521" onPress={deleteConta}/>
        </View>

    );
}

const styles = StyleSheet.create({
  containerNav:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
    paddingVertical:10,
  },
  container:{
    backgroundColor:'#FFFF',
    paddingVertical:20,
    marginVertical:10,
    paddingHorizontal:20,
    borderRadius:15,
    marginHorizontal:20,
    shadowColor: "#44475A",
    shadowOffset: {
        width: 5,
        height: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10.68,

    elevation: 11,
  },
  list:{
    backgroundColor:'#FFFF',
    marginVertical:10
  },
  name:{
    fontSize:24,
    fontWeight:"bold",
    fontFamily:"Poppins",
    color: "#282A36"
  },
  label:{
    fontSize:16,
    fontWeight:"bold",
    fontFamily:"Poppins",
    color: "#282A36",
    marginBottom:20
  },
  total:{
    fontSize:20,
    fontWeight:"bold",
    fontFamily:"Poppins",
    color: "#43A521"
  },
  item:{
    fontSize:18,
    color: "#282A36",
    fontFamily:"Poppins",
    fontWeight:'500'
  },
  doc:{
    fontSize:16,
    fontFamily:"Poppins",
    color: "#282A36"
  },
  row:{
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"space-between"
  }
});

export default ContaComponent;