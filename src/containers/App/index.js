import React from 'react';
// import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppDrawerNavigator from '../../routers/AppDrawerNavigator';
import {View, StatusBar} from 'react-native';
import {DrawerAnimationProvider} from '../../contexts/DrawerAnimationContext';
import { connect } from 'react-redux';
import LoginScreen from '../../screens/LoginScreen';
import AppStackNavigator from './../../routers/AppStackNavigator/index';
import StartRouter from './../../routers/AppStackNavigator/StartRouter';

function App(props) {
  return (
    <>
    {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}
    {/* <AppStackNavigator> */}

    {!props.login? <StartRouter/> :
    <DrawerAnimationProvider>
      <NavigationContainer>
        <AppDrawerNavigator />
      </NavigationContainer>
    </DrawerAnimationProvider>
    } 
      {/* </AppStackNavigator> */}
    </>
  );
}

function mapStateToProp(state) {
  return ({
      login: state.root.login
  })
}
// function mapDispatchToProp(dispatch) {
//   return ({
//       Login: (data) => { dispatch(Login(data)) }
//   })
// }

export default connect(mapStateToProp)(App);
