import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountryList from './CountryList';
import Dashboard from './Dashboard';

const Stack = createStackNavigator();

const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen name='Dashboard' component={Dashboard} options={{headerShown: false}} />
            <Stack.Screen name='CountryList' component={CountryList} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  
}

export default App;