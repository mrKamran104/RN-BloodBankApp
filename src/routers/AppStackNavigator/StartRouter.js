// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen/index';
import Signup from '../../screens/Signup/index';


const Stack = createStackNavigator();

function StartRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
            header: () => null,
          }}>
        <Stack.Screen name="Signin" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StartRouter;