import React from 'react';
import SignIn from '../pages/SignIn';
import Config from '../pages/Config';
import Cadastro from '../pages/Cadastro';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={SignIn} options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: "#43A521",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <AuthStack.Screen name="Cadastro" component={Cadastro} options={{
          title: 'Cadastro',
          headerStyle: {
            backgroundColor: "#43A521",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <AuthStack.Screen name="Config" component={Config} options={{
          title: 'Configurações da Aplicação',
          headerStyle: {
            backgroundColor: "#282A36",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;