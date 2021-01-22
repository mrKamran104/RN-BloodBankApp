import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Switch,
  ImageBackground,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {Login} from '../../store/action';
import Signup from '../Signup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';

const image = {uri: 'https://reactjs.org/logo-og.png'};
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
function LoginScreen(props) {
  // const [login, setLogin] = useState(false)
  const {navigation} = props;
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [error, setError] = useState('');
  const [hidePass, setHidePass] = useState(true);

  const signinwithEmail = () => {
    if (userName === '' || userPass === '') {
      // setError('Fields are required');
      createTwoButtonAlert();
      return;
    }
    props.Login(true);
  };

  // const signupwithEmail = () => {
  //   // props.Login(true);
  //   console.log("Signup Email")
  // };
  const signinwithgmail = () => {
    // props.Login(true);
    console.log("Gmail")
  };
  const signinwithfb = () => {
    // props.Login(true);
    console.log("facebook")
  };

  // const toggleSwitch = () =>{
  //   // setPass( { showPassword: !this.state.showPassword });
  // }

  const createTwoButtonAlert = () =>
    Alert.alert(
      `Error!!!`,
      `All Fields are required`,
      [
        ,
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel"
        // },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  console.log(props.login, userName, userPass);
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#c1cdd0',
      }}>
      <View style={styles.ImageBg}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.text}>Login Screen</Text>
        </ImageBackground>
      </View>

      {/* <View> */}
      <View style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input value={userName} onChangeText={(val) => setUserName(val)} />
          </Item>
            {/* <View> */}
          <Item floatingLabel>
            <Label>Password</Label>
            <Input value={userPass} onChangeText={(val) => setUserPass(val)} secureTextEntry={hidePass ? true : false}/>
            {/* <Icon
              name={hidePass ? 'eye-slash' : 'eye'}
              size={15}
              color="grey"
              onPress={() => setHidePass(!hidePass)}
            /> */}
          </Item>
        {/* </View> */}
          <Button
            style={{
              marginTop: 50,
              marginEnd: 30,
              marginStart: 30,
              backgroundColor: 'green',
            }}
            onPress={signinwithEmail}
            iconLeft
            block>
            {/* <Icon name='home' /> */}
            <Text style={{color: 'white'}}>Signin with Email</Text>
          </Button>
          {/* {error && (
            <Alert severity="error" onClick={() => setError(null)}>
              {error}
              </Alert>
            )} */}

          {/* <Button style={{marginTop: 50}} onPress={() => props.Login(true)} title="Login" /> */}
        </Form>
        <Text
          style={{
            marginTop: 25,
            marginBottom: 25,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          - OR -
        </Text>
        <View style={{paddingBottom: 50}}>
          <Button
            style={{marginEnd: 30, marginStart: 30}}
            onPress={()=>navigation.navigate('Signup')}
            iconLeft
            block>
            {/* <Icon name='home' /> */}
            <Text style={{color: 'white'}}>Signup with Email</Text>
          </Button>
          <Button
            style={{
              marginTop: 20,
              marginEnd: 30,
              marginStart: 30,
              backgroundColor: 'red',
            }}
            onPress={signinwithgmail}
            iconLeft
            block>
            {/* <Icon name='home' /> */}
            <Text style={{color: 'white'}}>Signup with Gmail</Text>
          </Button>
          <Button
            style={{marginTop: 20, marginEnd: 30, marginStart: 30}}
            onPress={signinwithfb}
            iconLeft
            block>
            {/* <Icon name='home' /> */}
            <Text style={{color: 'white'}}>Signup with Facebook</Text>
          </Button>
        </View>
      </View>
      {/* </View> */}

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
// backgroundColor: '#ffffff'
const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    // bottom: 50,
    bottom: 0,
    flex: 0.3,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 2,
    left: 0,
    paddingTop: 25,
    // borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  boder: {
    borderTopRightRadius: 80,
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    // flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    paddingTop: 130,
    paddingBottom: 130,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  ImageBg: {
    flex: 1,
    // height: 50,
    flexDirection: 'column',
  },
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
  return {
    login: state.root.login,
  };
}
function mapDispatchToProp(dispatch) {
  return {
    Login: (data) => {
      dispatch(Login(data));
    },
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(LoginScreen);
