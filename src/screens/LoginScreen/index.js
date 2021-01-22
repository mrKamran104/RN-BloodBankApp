import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Login } from '../../store/action';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
function LoginScreen(props) {
  // const [login, setLogin] = useState(false)
  const { navigation } = props;
  console.log(props.login)
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#c1cdd0',
      }}
      
      >
        <View style={styles.container}>

        </View>
      <Text style={{ padding: 20 }}>Login Screen </Text>

<Button onPress={()=>props.Login(true)} title="Login"/>
      {/* <TouchableOpacity
        onPress={()=>console.log("kk")}
        style={{ backgroundColor: 'blue', padding: 8, borderRadius: 4 }}>
        <Text style={{ color: 'white' }}>Login</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Home', {login: {login}})}
        style={{ backgroundColor: 'blue', padding: 8, borderRadius: 4 }}>
        <Text style={{ color: 'white' }}>Go to Home</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: WIDTH, backgroundColor: '#ffffff' },
  contentContainer: {
    backgroundColor: '#f6f6f6',
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  searchContainer: {
    padding: 32,
  },
});

function mapStateToProp(state) {
  return ({
      login: state.root.login
  })
}
function mapDispatchToProp(dispatch) {
  return ({
      Login: (data) => { dispatch(Login(data)) }
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(LoginScreen);