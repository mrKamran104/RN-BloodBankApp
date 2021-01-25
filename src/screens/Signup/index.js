import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Switch,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
// import ImagePicker from 'react-native-image-crop-picker';
import { openCamera, openGallery } from "../../utils/SelectImage";
import {Login} from '../../store/action';
import {SignupUser} from '../../store/action';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  ListItem,
  //   Icon,
  Button,
  Radio,
  ActionSheet
} from 'native-base';
import demo from "../../assets/demo.png";

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
var BUTTONS = [
  { text: "Choose from Gallery", icon: "camera", iconColor: "#2c8ef4" },
  { text: "Capture from Camera", icon: "camera", iconColor: "#f42ced" },
  // { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
// var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 2;


function Signup(props) {

  const ImageUri = Image.resolveAssetSource(demo).uri

  // const [login, setLogin] = useState(false)
  const {navigation} = props;
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [genderRadio, setGenderRadio] = useState(true);
  // const [genderValue, setGenderValue] = useState('Male');
  const [userAddress, setUserAddress] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [passError, setPassError] = useState(false);
  const [resourcePath, setResourcePath] = useState(ImageUri);
  const [hidePass, setHidePass] = useState(true);

  

  const signupwithEmail = () => {
    if (userName === '' || userPass === '' || userAddress === '' || userEmail === '' || passError === true || confirmPass === '' || resourcePath === ImageUri) {
      // setError('Fields are required');
      createTwoButtonAlert('Error!!!', 'All fields are required!!!', () => console.log('OK Pressed'));
      return;
    }
    props.SignupUser({email: userEmail, gender: genderRadio,password: userPass, userName: userName, address: userAddress, func: ()=>{navigation.navigate('Signin', {params: {userEmail: userEmail}})}})
    // console.log('Signup Email', props.SignupUser);
    // props.Login(true);
  };

  console.log('gender',genderRadio)

  const RadioButton = (props) => {
    return (
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          },
          props.style,
        ]}>
        {props.selected ? (
          <View
            style={[
              {
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#000',
              },
              props.innerStyle,
            ]}
          />
        ) : null}
      </View>
    );
  };
  const matchConfirmPassword = (val) => {
    setConfirmPass(val);
    if (userPass !== val) {
      setPassError(true);
    } else {
      setPassError(false);
    }
  };
  const matchPassword = (val) => {
    setUserPass(val);
    if (confirmPass !== val) {
      setPassError(true);
    } else {
      setPassError(false);
    }
  };

//   const openCamera = () => {
//     ImagePicker.openPicker({
//         // width: 300,
//         // height: 400,
//         // cropping: true,
//         mediaType: 'any',
        
//     }).then(image => {
//         console.log(image);
//         setResourcePath(image.path);
//     });
// }

  const createTwoButtonAlert = (title, msg, func) =>
    Alert.alert(
      title,
      msg,
      [
        ,
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel"
        // },
        {text: 'OK', onPress: func},
      ],
      {cancelable: false},
    );
  console.log(props.login, userName, userPass);
  return (
    <ScrollView
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // bottom: 20,
        backgroundColor: 'white',
      }}>

      <View style={styles.container}>
        <Text style={styles.text}>Signup Screen</Text>
        <Button
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          iconLeft
          transparent>
          {/* <Icon name='home' /> */}
          <Text style={{color: 'black'}}>Back</Text>
        </Button>
        <TouchableOpacity 
          onPress={ 
            () =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                // destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Please select a option:"
              },
              async(buttonIndex) => {
                if(buttonIndex===0){
                   let d = await openGallery(); setResourcePath(d)
                }
                else if(buttonIndex===1){
                   let d = await openCamera(); setResourcePath(d)
                }
                else{

                }
              }
            )
          }>
          <Image source={{ uri: resourcePath }} style={{ height: 150, width: 150, resizeMode: 'cover', alignSelf: 'center' }} />
          {/* <Text style={styles.buttonText}>Select File</Text> */}
        </TouchableOpacity>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input value={userName} onChangeText={(val) => setUserName(val)} />
          </Item>

          <Text style={{marginStart: 20, fontSize: 16, marginTop: 10}}>
            Gender
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 80,
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {setGenderRadio(true); }}>
              {RadioButton({
                selected: genderRadio,
                style: {borderColor: 'green'},
                innerStyle: {backgroundColor: 'green'},
              })}
              <Text style={{paddingLeft: 10, textAlignVertical: 'center'}}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => setGenderRadio(false)}>
              {RadioButton({
                selected: !genderRadio,
                style: {borderColor: 'green'},
                innerStyle: {backgroundColor: 'green'},
              })}
              <Text style={{paddingLeft: 10, textAlignVertical: 'center'}}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
          {/* <ListItem>
            <Left>
            <Text>Daily Stand Up</Text>
            </Left>
            <Right>
              <Radio selected={false} />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Discussion with Client</Text>
            </Left>
            <Right>
              <Radio selected={true} />
            </Right>
          </ListItem> */}
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              value={userEmail}
              // autoCompleteType="email"
              onChangeText={(val) => setUserEmail(val)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Address</Label>
            <Input
              value={userAddress}
              onChangeText={(val) => setUserAddress(val)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              value={userPass}
              secureTextEntry={hidePass ? true : false}
              onChangeText={(val) => matchPassword(val)}
            />
          </Item>
          <Item
            floatingLabel
            error={confirmPass === '' ? false : passError ? true : false}
            // success={!passError? userPass===''?false: true : false}
            disabled={userPass === '' ? true : false}>
            <Label>Confirm Password</Label>
            <Input
              disabled={userPass === '' ? true : false}
              value={confirmPass}
              secureTextEntry={hidePass ? true : false}
              onChangeText={(val) => matchConfirmPassword(val)}
            />
          </Item>
          {/* {error && (
            <Alert severity="error" onClick={() => setError(null)}>
              {error}
              </Alert>
            )} */}

          {/* <Button style={{marginTop: 50}} onPress={() => props.Login(true)} title="Login" /> */}
        </Form>
        {/* <Text
          style={{
            marginTop: 25,
            marginBottom: 25,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          - OR -
        </Text> */}
        <Button style={styles.signup} onPress={signupwithEmail} iconLeft block>
          {/* <Icon name='home' /> */}
          <Text style={{color: 'white'}}>Signup with Email</Text>
        </Button>
      </View>
      {/* <View style={styles.container2}> */}
      {/* </View> */}
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
    </ScrollView>
  );
}
// backgroundColor: '#ffffff'
const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    // bottom: 0,
    // backgroundColor: 'white',
    paddingTop: 25,
    paddingBottom: 30,
    // position: 'absolute',
    // flex: 0.3,
    // borderWidth: 5,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  container2: {
    width: WIDTH,
    // bottom: 50,
    // backgroundColor: 'white',
    paddingTop: 25,
    paddingBottom: 30,
    // position: 'absolute',
    // zIndex: 2,
    // left: 0,
    // bottom: 0,
    // flex: 0.3,
    // flex: 0.3,
    // borderWidth: 5,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  signup: {
    marginTop: 50,
    marginEnd: 30,
    marginStart: 30,
    backgroundColor: 'green',
  },
  backButton: {
    // color: 'white',
    position: 'absolute',
    top: 10,
    left: 15,
    // backgroundColor: '',
    // fontSize: 20,
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
    color: 'black',
    fontSize: 42,
    paddingTop: 15,
    paddingBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor: '#000000a0',
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
    SignupUser: (data) => {dispatch(SignupUser(data));},
    Login: (data) => {dispatch(Login(data));},
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);
