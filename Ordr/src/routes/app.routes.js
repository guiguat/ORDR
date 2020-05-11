import React from 'react';
import Dashboard from '../pages/Dashboard';
import Venda from '../pages/Venda';
import Contas from '../pages/Contas';
import Config from '../pages/Config';
import { createStackNavigator } from '@react-navigation/stack';
const AppStack = createStackNavigator();

function AppRoutes() {
  return (
    <AppStack.Navigator>
        <AppStack.Screen name="Dashboard" component={Dashboard} options={{
          title: 'HOME',
          headerStyle: {
            backgroundColor: "#43A521",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <AppStack.Screen name="Venda" component={Venda} options={{
          title: 'Nova Venda',
          headerStyle: {
            backgroundColor: "#43A521",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <AppStack.Screen name="Contas" component={Contas} options={{
          title: 'Gerenciar Contas',
          headerStyle: {
            backgroundColor: "#43A521",
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