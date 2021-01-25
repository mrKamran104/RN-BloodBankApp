// import ActionTypes from '../constant/constant';
import {
    Alert,
  } from 'react-native';
import firebase from './firebase';
// import history from '../../history'

// Initialize Firebase

export function Logout(data) {
    return (dispatch)=> firebase.auth().signOut().then(() => {
        // Sign-out successful.
       dispatch({type: 'Logout', payload: data});
      }).catch((error) => {
        // An error happened.
      });
}

export function SignupUser(user) {
  console.log('before', user);
  // return dispatch => dispatch({type: "Login", payload: data})
  return (dispatch) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(function (result) {
        let create_user = {
          name: user.userName,
          email: user.email,
          address: user.address,
          // profile: user.photoURL,
          gender: user.gender,
          uid: result.user.uid,
        };
        return firebase
          .database()
          .ref('/')
          .child(`users/${result.user.uid}`)
          .set(create_user)
          .then(() => {
            console.log('database', create_user);
            createTwoButtonAlert('Hurry', 'You are successfully signup,\n Click "Ok" to go Login screen', user.func);
            dispatch({type: 'SignupUser', payload: create_user});
            // alert('user login successfully')
            // history.push('/chat')
          });
        console.log('afterdb', result.user.uid);
        // history.push('/login')
      })
      .catch(function (error) {
        console.log(error);
        createTwoButtonAlert('Error!!!', `${error}`, () => console.log('OK Pressed'));
        // dispatch({ type: 'SignupUser', payload: create_user })
      });
  };
  // return dispatch => dispatch({type: 'SignupUser', payload: user})
}

export function SigninUser(user) {
  return (dispatch) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(function (result) {
        console.log(result);

        return firebase
          .database()
          .ref('/')
          .child(`users/${result.user.uid}`)
          .once('value')
          .then((data) => {
            // this.state.chats.push(messages.val())
            // this.setState({
            //     chats: this.state.chats
            // })
            console.log(data.val().address);
            dispatch({
              type: 'SigninUser',
              payload: {data: data.val(), login: user.login},
            });
          });
      })
      .catch(function (error) {
        console.log(`${error}`);
        // dispatch({
        //     type: 'Error',
        //     payload: {error: true, msg: `${error}`},
        //   });
          createTwoButtonAlert('Error!!!', `${error}`, () => console.log('OK Pressed'));
        // Handle Errors here.
        // ...
      });
  };
}

export function updateProfile(user) {
  let update_user = {
    uid: user.uid,
    email: user.email,
    name: user.userName,
    address: user.address,
    gender: user.gender
  };

  return (dispatch) => {
    firebase
      .database()
      .ref('/')
      .child(`users/${user.uid}`)
      .update(update_user)
      .then(() => {
        console.log('database', update_user);
        dispatch({type: 'updateProfile', payload: update_user});
        // alert('user login successfully')
        // history.push('/chat')
      });
  };
}

// const facebook_login = (history) => {

//     return (dispatch) => {
//         var provider = new firebase.auth.FacebookAuthProvider();
//         firebase.auth().signInWithPopup(provider)
//             .then((result) => {
//                 var credential = result.credential;
//                 var user = result.user;
//                 var accessToken = credential.accessToken;

//                 let create_user = {
//                     name: user.displayName,
//                     email: user.email,
//                     profile: user.photoURL,
//                     uid: user.uid,
//                 }

//                 firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
//                     .then(() => {
//                         dispatch({ type: 'setUser', payload: create_user })
//                         alert('user login successfully')
//                         history.push('/chat')
//                     })

//             })
//             .catch((error) => {
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 console.log(errorMessage)

//                 // ...
//             });

//     }
// }

// const get_users = () => {
//     return (dispatch) => {
//         let users = [];
//         firebase.database().ref('/').child('users').on('child_added', (data) => {
//             users.push(data.val())
//             console.log('firebase data', data.val())
//         })

//         dispatch({
//             type: 'SetFirebaseUsers', payload: users
//         })

//     }
// }

// export {
//     facebook_login,
//     get_users
// }

// history.push('/signup')
// return dispatch => dispatch({type: ActionTypes.SigninUser, payload: user})
// }

// export function SignOut(){
//     firebase.auth().signOut().then(function() {
//         // Sign-out successful.
//       }).catch(function(error) {
//         // An error happened.
//       });
//       return dispatch => dispatch({type: ActionTypes.SignOut})
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