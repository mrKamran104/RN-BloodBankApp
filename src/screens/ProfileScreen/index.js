import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Switch,
  ImageBackground,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
// import ImagePicker from 'react-native-image-crop-picker';
import {openCamera, openCrop} from '../../utils/SelectImage';
import {updateProfile} from '../../store/action';
// import {SignupUser} from '../../store/action';
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
} from 'native-base';
import demo from '../../assets/demo.png';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
function ProfileScreen(props) {
  const ImageUri = Image.resolveAssetSource(demo).uri;

  // const [login, setLogin] = useState(false)
  const {navigation} = props;
  const [userName, setUserName] = useState(props.userName);
  const [genderRadio, setGenderRadio] = useState(props.gender);
  const [userAddress, setUserAddress] = useState(props.address);
  const [userEmail, setUserEmail] = useState(props.email);
  const [resourcePath, setResourcePath] = useState(ImageUri);
  const [edit, setEdit] = useState(false);

  const EditProfile = () => {
    setEdit(true);
    if (edit) {
      props.updateProfile({
        uid: props.uid,
        userName: userName,
        address: userAddress,
        email: userEmail,
        gender: genderRadio,
      });
      setEdit(false);
    }
    // if (userName === '' || userPass === '' || userAddress === '' || userEmail === '' || passError === true || confirmPass === '' || resourcePath === ImageUri) {
    //   // setError('Fields are required');
    //   createTwoButtonAlert('Error!!!', 'All fields are required!!!', () => console.log('OK Pressed'));
    //   return;
    // }
    // props.SignupUser({email: userEmail, password: userPass, userName: userName})
    // createTwoButtonAlert('Hurry', 'You are successfully signup,\n Click "Ok" to go Login screen', ()=> navigation.navigate('Signin', {params: {userName: userName}}));
    // console.log('Signup Email', props.SignupUser);
    // props.Login(true);
  };

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

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {/* <View style={{}}>
        <Text style={styles.text}>Profile Screen</Text>
        <Button
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          iconLeft
          transparent>
          <Icon name='home' />
          <Text style={{color: 'black'}}>Back</Text>
        </Button>
      </View> */}

      <View>
        <TouchableOpacity
          onPress={async () => {
            let d = await openCamera();
            setResourcePath(d);
          }}>
          <Image
            source={{uri: resourcePath}}
            style={{
              height: 150,
              width: 150,
              resizeMode: 'cover',
              alignSelf: 'center',
            }}
          />
          {/* <Text style={styles.buttonText}>Select File</Text> */}
        </TouchableOpacity>
      </View>

      {/* <View> */}
      <View style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              value={userName}
              onChangeText={(val) => setUserName(val)}
              disabled={!edit ? true : false}
            />
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
              onPress={() => setGenderRadio(true)}>
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
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              value={userEmail}
              // autoCompleteType="email"
              disabled={true}
              onChangeText={(val) => setUserEmail(val)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Address</Label>
            <Input
              value={userAddress}
              disabled={!edit ? true : false}
              onChangeText={(val) => setUserAddress(val)}
            />
          </Item>
        </Form>
      </View>
      <View style={styles.container2}>
        <Button style={styles.signup} onPress={EditProfile} iconLeft block>
          <Text style={{color: 'white'}}>{!edit ? 'Edit' : 'Update'}</Text>
        </Button>
      </View>
    </View>
  );
}
// backgroundColor: '#ffffff'
const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    // bottom: 50,
    // backgroundColor: 'white',
    paddingTop: 25,
    paddingBottom: 30,
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
    // login: state.root.login,
    userName: state.root.userName,
    email: state.root.email,
    address: state.root.address,
    uid: state.root.uid,
    gender: state.root.gender,
  };
}
function mapDispatchToProp(dispatch) {
  return {
    // SignupUser: (data) => {dispatch(SignupUser(data));},
    updateProfile: (data) => {
      dispatch(updateProfile(data));
    },
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(ProfileScreen);
