import React, {createContext, useState, useEffect, useContext} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext({signed: false, user: {}});

export const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(true);
    const [baseURL, setBaseURL] = useState('http://192.168.15.17:3333');
    const [user, setUser] = useState();
    const [reloadCozinha, setReloadCozinha] = useState(false);

    useEffect(()=>{
        async function loadStoragedData () {
            const storageUser = await AsyncStorage.getItem('@ORDR:user');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            else if (!storageUser ) {
                setLoading(false);
            }
        }
        async function loadBaseURL(){
            const storageURL = await AsyncStorage.getItem('@ORDR:baseURL');
            if(storageURL){
                setBaseURL(storageURL);
            }
        }
        loadBaseURL();
        loadStoragedData();
        // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        // return subscriber; // unsubscribe on unmount
        
    }, []);

    async function signIn(email, password){
       try {
            const userResp = await auth().signInWithEmailAndPassword(email, password);
            let nome = userResp.user.email;
            [nome] = nome.split('@');
            const usuario={
                id:userResp.user.uid,
                nome
            }
            AsyncStorage.setItem('@ORDR:user',JSON.stringify(usuario));
            setUser(usuario);
       } catch (error) {
           console.log(error);
           Alert.alert('Erro ao autenticar-se:', 'Usuário ou senha inválidos')
       }

    }

    async function createUser(email, password){
        try {
            const userResp = await auth().createUserWithEmailAndPassword(email, password);
            Alert.alert("Sucesso!","Usuario criado!")
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao autenticar-se:', 'Usuário ou senha inválidos')
        }
 
    }

    function signOut(){
        AsyncStorage.removeItem('@ORDR:user').then(()=>{
            setUser(null);
        });
        auth().signOut();
    }
    function changeBaseURL(url){
        setBaseURL(url);
        AsyncStorage.setItem('@ORDR:baseURL', url);
    }
    return (
        <AuthContext.Provider value={{signed:!!user, user, loading, signIn, signOut, baseURL, changeBaseURL, createUser, reloadCozinha, setReloadCozinha}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}