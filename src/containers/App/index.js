import React from 'react';
// import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppDrawerNavigator from '../../routers/AppDrawerNavigator';
import {View, StatusBar} from 'react-native';
import {DrawerAnimationProvider} from '../../contexts/DrawerAnimationContext';
import { connect } from 'react-redux';
import LoginScreen from '../../screens/LoginScreen';

function App(props) {
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
    {!props.login? <LoginScreen /> :
    <DrawerAnimationProvider>
      <NavigationContainer>
        <AppDrawerNavigator />
      </NavigationContainer>
    </DrawerAnimationProvider>}
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
