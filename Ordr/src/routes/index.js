import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import {useAuth} from '../contexts/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const {signed, loading, user} = useAuth();
  if(loading){
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <ActivityIndicator size="large" color="#3F9521"/>
      </View>
    );
  }
  return signed? <AppRoutes user={user}/> : <AuthRoutes user={user}/>
}

export default Routes;