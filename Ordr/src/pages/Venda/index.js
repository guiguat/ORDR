import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList, Keyboard, StatusBar } from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useAuth} from '../../contexts/auth';
import Button from '../../components/Button';
import * as api from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Venda = ({navigation}) => {
    const {user, baseURL} = useAuth();
    const [productPickerValue, setProductPickerValue] = useState('');
    const [metodoPickerValue, setMetodoPickerValue] = useState('');
    const [clientePickerValue, setClientePickerValue] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantidade, setQuantidade] = useState('');
    const [total, setTotal] = useState(0.00);
    const [mesa, setMesa] = useState('0');
    const [valorPago, setValorPago] = useState('0.00');
    const [clientes, setClientes] = useState([]);


    useEffect(()=>{
        async function getProducts(){
            try{
                const response = await api.get(`${baseURL}/produto`);
                setAllProducts(response.data);
            }
            catch(err){
                alert('Erro ao conectar-se ao servidor');
                console.log(err);
            }
        }
        async function getClientes(){
            try{
              const response = await api.get(`${baseURL}/cliente`);
              setClientes(response.data);
            }
            catch(err){
              alert('Erro ao conectar-se ao servidor');
              console.log(err);
            }
        }
      
        getClientes();
        getProducts();
    },[]);

    function handleAddProduct(){
        if(parseInt(quantidade)>0 && productPickerValue !== ''){
            let auxSelectedProducts = selectedProducts;
            let auxTotal = 0.00;
            for (let i = 0; i < parseInt(quantidade); i++) {
                auxSelectedProducts.push(allProducts[parseInt(productPickerValue)]);
            }
            auxSelectedProducts.map(item=>auxTotal+= parseFloat(item.preco));
            setSelectedProducts(auxSelectedProducts);
            setTotal(auxTotal);
            Keyboard.dismiss();
            setProductPickerValue('');
            setQuantidade('');
        }
        else{
            Alert.alert("Valores nulos ou inválidos","Preencha os campos corretamente.")
        }
    }
    
    async function handleSend(){
        if(metodoPickerValue !== ""  && parseInt(mesa)>0 && selectedProducts !== []){
            let addCredito = 0.00;
            let addDebito = 0.00;
            let addDinheiro = 0.00;
            switch (metodoPickerValue){
                case "credito":
                    addCredito = total.toFixed(2);
                    break;
                case "debito":
                    addDebito = total.toFixed(2);
                    break;
                case "dinheiro":
                    addDinheiro = total.toFixed(2);
                    break;
                default: 
                    addCredito = 0.00;
                    addDebito = 0.00;
                    addDinheiro = 0.00;
                    break;
            }
            const dataPedidos = {
                mesa:parseInt(mesa),
                pedidos: selectedProducts,
                user:user.nome
            }
            const dataRelatorio = {
                addDebito:parseFloat(addDebito),
                addCredito:parseFloat(addCredito),
                addDinheiro:parseFloat(addDinheiro)
            }
            const dataClientes = {
                produtos:selectedProducts,
                cliente:clientePickerValue
            }

            try{
                await api.post(`${baseURL}/pedido`, dataPedidos);
                clientePickerValue === ""? console.log("No cliente selected") : await api.post(`${baseURL}/contas`, dataClientes);
                const response = await api.put(`${baseURL}/relatorio`, dataRelatorio);
                alert(response.data.message);
                navigation.navigate('Dashboard');
            }
            catch(err){
                Alert.alert("Venda negada: Erro ao conectar-se com servidor");
                console.log(err);
            }
        }
        else{
            Alert.alert('Erro:', 'Preencha os campos corretamente');
        }

    }

    function capitalize(prop) {
        return prop.charAt(0).toUpperCase() + prop.slice(1);
    }
    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor="#43A521" />
            <Text style={styles.h1}>{`Atendente: ${capitalize(user.nome)}`}</Text>
            <View style={styles.controls}>
                <Picker
                    selectedValue={productPickerValue}
                    style={styles.picker}
                    onValueChange={(itemValue) => setProductPickerValue(itemValue)}
                >
                    <Picker.Item label="Escolha um Produto" value="" />
                    {
                        allProducts.map((product, index)=>(
                            <Picker.Item key={index} label={`${product.nome}`} value={`${index}`} />
                        ))
                    }
                </Picker>
                <TextInput keyboardType="numeric"
                    style={styles.input} 
                    placeholder="Quantidade" 
                    value={quantidade} 
                    onChangeText={text=>setQuantidade(text)}
                />

                <TouchableOpacity onPress={handleAddProduct} style={{marginLeft:20,flexDirection:"row", alignItems:"center"}}>
                    <Icon name="add-circle" size={36} color="#43A521"/>
                </TouchableOpacity>
            </View>
            <Button style={{paddingVertical:10}} title="Limpar" color="#282A36" onPress={()=>{setSelectedProducts([])}}/>

            <View style={styles.containerNav}>
                <Text style={{fontSize:18,fontFamily:'Poppins', fontWeight:'bold'}}>Produto</Text>
                <Text style={{fontSize:18,fontFamily:'Poppins', fontWeight:'bold'}}>Preco</Text>
            </View>
    
            <FlatList
                data={selectedProducts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                <View style={styles.containerNav}>
                    <Text style={styles.item}>{item.nome.toUpperCase()}</Text>
                    <Text style={styles.item}>{item.preco}</Text>
                </View>
                )}
            />
            <Text style={[styles.h1,{fontSize:24, marginTop:10}]}>Total: <Text style={styles.total}>{`R$${total.toFixed(2).toString()}`}</Text></Text>
            
            <View style={styles.form}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.label}>Mesa:</Text>
                        <TextInput keyboardType="numeric"
                            style={styles.input} 
                            placeholder="Mesa do pedido" 
                            value={mesa} 
                            onChangeText={text=>setMesa(text)}
                        />
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.label}>Valor pago:</Text>
                        <TextInput keyboardType="numeric"
                            style={styles.input} 
                            placeholder="Valor pago pelo cliente" 
                            value={valorPago} 
                            onChangeText={text=>setValorPago(text)}
                        />
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.label}>Troco:</Text>
                        <Text style={styles.troco}>{`R$${parseFloat(valorPago)>=total?(parseFloat(valorPago)-total).toFixed(2):0.00}`}</Text>
                    </View>
                </View>

                <View style={[styles.row, {marginBottom:5}]}>
                    <View style={styles.col}>
                        <Text style={styles.label}>Método:</Text>
                        <Picker
                            selectedValue={metodoPickerValue}
                            style={styles.picker}
                            onValueChange={(itemValue) => setMetodoPickerValue(itemValue)}
                        >
                            <Picker.Item label="Método de pagamento" value="" />
                            <Picker.Item label="Débito" value="debito" />
                            <Picker.Item label="Crédito" value="credito" />
                            <Picker.Item label="Dinheiro" value="dinheiro" />
                        </Picker>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.label}>Cliente(opcional):</Text>
                        <Picker
                            selectedValue={clientePickerValue}
                            style={styles.picker}
                            onValueChange={(itemValue) => setClientePickerValue(itemValue)}
                        >
                            <Picker.Item label="Escolha um cliente" value="" />
                            {
                                clientes.map((cliente, index)=>(
                                    <Picker.Item key={index} label={`${cliente.nome}`} value={`${cliente.id}`} />
                                ))
                            }
                        </Picker>
                    </View>
                </View>
                <Button style={{paddingVertical:12}} title="Enviar pedido" color="#43A521" onPress={handleSend}/>
            </View>

        </View>
     
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        paddingHorizontal:20,
        paddingTop:20,
        backgroundColor:"#FFFF"
    },
    h1:{
        fontSize:18,
        fontWeight:"bold",
        fontFamily:'Poppins',
        color:"#282A36"
    },
    picker:{ 
        height: 50,
        width: 150,
        color:"#282A36"
    },
    controls:{
        flexDirection:"row",
        marginBottom:20
    },
    input:{
        borderColor:"#E1E1E1",
        borderWidth:2,
        borderRadius:6,
        paddingVertical:2,
        paddingLeft:10,
        color:"#8D8D94",
        fontFamily:'Poppins',
        fontWeight:"500",
        maxWidth:140
    },
    containerNav:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'space-between',
        backgroundColor:'#F2F2F2',
        paddingHorizontal:20,
        paddingVertical:10
    },
    item:{
        fontFamily:'Poppins',
        fontSize:16
    },
    total:{
        fontSize:36,
        fontFamily:'Poppins',
        color:"#43A521"
    },
    row:{
        flexDirection:"row",
        marginBottom:30,
        justifyContent:"space-between"
    },
    form:{
        marginBottom:20,
        marginTop:10
    },
    col:{
        justifyContent: "space-between"
    },
    label:{
        fontSize:18,
        fontFamily:'Poppins',
        fontWeight:"500"
    },
    troco:{
        fontSize:18,
        fontFamily:'Poppins',
        color:"#43A521",
        fontWeight:"bold"
    }
    
})

export default Venda;