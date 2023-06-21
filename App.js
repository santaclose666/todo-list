import React from 'react';
import Home from './src/screens/Home';
import Edit from './src/screens/Edit';
import Add from './src/screens/Add';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
        <Stack.Screen name="Add" component={Add}></Stack.Screen>
        <Stack.Screen name="Edit" component={Edit}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
