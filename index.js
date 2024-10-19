import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './LoginScreen'; // импортируйте компонент LoginScreen из отдельного файла
import { RegistrationScreen } from './RegistrationScreen'; // импортируйте компонент RegistrationScreen из отдельного файла
import { MainScreen } from './MainScreen'; // импортируйте компонент MainScreen из отдельного файла
import RequestDetailsScreen from './RequestDetailsScreen'; // Импортируйте экран деталей запроса
import { AppRegistry, StatusBar, SafeAreaView, Text, StyleSheet } from 'react-native';
import 'react-native-get-random-values';

const Stack = createStackNavigator();

AppRegistry.registerComponent('InLab', () => App);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
