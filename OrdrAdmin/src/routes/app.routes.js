import React from 'react';
import Dashboard from '../pages/Dashboard';
import Cozinha from '../pages/Cozinha';
import Produtos from '../pages/Produtos';
import Config from '../pages/Config';
import { createStackNavigator } from '@react-navigation/stack';
const AppStack = createStackNavigator();

function AppRoutes() {
  return (
    <AppStack.Navigator>
        <AppStack.Screen name="Dashboard" component={Dashboard} options={{
          title: 'HOME',
          headerStyle: {
            backgroundColor: "#1B5E9B",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <AppStack.Screen name="Produtos" component={Produtos} options={{
          title: 'Gerenciar Produtos',
          headerStyle: {
            backgroundColor: "#0E848B",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <AppStack.Screen name="Cozinha" component={Cozinha} options={{
          title: 'Cozinha',
          headerStyle: {
            backgroundColor: "#003959",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        
        <AppStack.Screen name="Config" component={Config} options={{
          title: 'Configurações da Aplicação',
          headerStyle: {
            backgroundColor: "#282A36",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
    </AppStack.Navigator>
  );
}

export default AppRoutes;