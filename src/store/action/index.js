// import ActionTypes from '../constant/constant';
import { Alert } from 'react-native';
import firebase from './firebase';
import RNFetchBlob from 'react-native-fetch-blob'
// import history from '../../history'

// Initialize Firebase
// const uriToBlob = (uri) => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//       // return the blob
//       resolve(xhr.response);
//     };

//     xhr.onerror = function() {
//       // something went wrong
//       reject(new Error('uriToBlob failed'));
//     };
//     // this helps us get a blob
//     xhr.responseType = 'blob';
//     xhr.open('GET', uri, true);

//     xhr.send(null);
//   });
// }

export function Logout(data) {
  return (dispatch) =>
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        dispatch({ type: 'Logout', payload: data });
      })
      .catch((error) => {
        // An error happened.
      });
}

export function SignupUser(user) {
  console.log('before', user);
  let create_user = {
    name: user.userName,
    email: user.email,
    address: user.address,
    gender: user.gender,
    bloodGroup: user.bloodGroup,
    donor: user.donor,
    phoneNo: user.phoneNo
  }
  // return dispatch => dispatch({type: "Login", payload: data})
  return (dispatch) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(async (result) => {
        create_user['uid'] = result.user.uid;
        // RNFetchBlob.fs.readFile(user.photo, 'base64')
        //   .then((data) => {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function () {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", user.photo, true);
          xhr.send(null);
        });

        // handle the data ..
        // console.log(data)
        console.log(result.user.uid)
        // let d = `data:image/*;base64,${data}`

        // return 

        const ref = firebase.storage().ref().child(`${result.user.uid}.${user.photo.substring(user.photo.lastIndexOf('.') + 1)}`)
        let d = await ref.put(blob, { contentType: 'image/*' })
        let url = await d.ref.getDownloadURL();
        // .then(function (uploadImage) {
        create_user['photo'] = url;
        console.log("uploadImage", url)
        return firebase
          .database()
          .ref('/')
          .child(`users/${result.user.uid}`)
          .set(create_user)
          .then(() => {
            console.log('database', create_user);
            createTwoButtonAlert(
              'Hurry',
              'You are successfully signup,\n Click "Ok" to go Login screen',
              user.func,
            );
            dispatch({ type: 'SignupUser', payload: create_user });
            // alert('user login successfully')
            // history.push('/chat')
          });
        // })
        // })
      }).catch(function (error) {
        console.log(error);
        dispatch({
          type: 'Disable',
          payload: false,
        });
        createTwoButtonAlert('Error!!!', `${error}`, () =>
          console.log('OK Pressed'),
        );
        // dispatch({ type: 'SignupUser', payload: create_user })
      });

  };
}
// return dispatch => dispatch({type: 'SignupUser', payload: user})


export function Disable(para) {
  return (dispatch) => {
    dispatch({
      type: 'Disable',
      payload: para,
    });
  };
}

export function SigninUser(user) {
  return (dispatch) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(function (result) {
        console.log(result);
        // return firebase.storage().ref().child(result.user.uid).getDownloadURL()
        //   .then(fireBaseUrl => {
        //     console.log(fireBaseUrl)
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
              payload: { data: data.val(), login: user.login },
            });
          });
        // })
      })
      .catch(function (error) {
        // console.log(`${error}`);
        dispatch({
          type: 'Disable',
          payload: false,
        });
        createTwoButtonAlert('Error!!!', `${error}`, () =>
          console.log('OK Pressed'),
        );
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
    gender: user.gender,
    bloodGroup: user.bloodGroup,
    donor: user.donor,
    phoneNo: user.phoneNo
  };

  return async (dispatch) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", user.photo, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(`${user.uid}.${user.photo.substring(user.photo.lastIndexOf('.') + 1)}`)
    let d = await ref.put(blob, { contentType: 'image/*' })
    let url = await d.ref.getDownloadURL();
    update_user['photo'] = url

    return firebase.database().ref('/')
      .child(`users/${user.uid}`)
      .update(update_user)
      .then(() => {
        console.log('database', update_user);
        dispatch({ type: 'updateProfile', payload: update_user });
        // alert('user login successfully')
        // history.push('/chat')
      });
  }
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

export const GetDonor = (Blood) => {
  console.log('gg', Blood.Group);
  let donors = [];
  return (dispatch) => {
    firebase
      .database()
      .ref('/users/')
      .orderByChild('bloodGroup')
      .equalTo(Blood.Group)
      .once('value')
      .then((data) => {
        // donors.push(data.val())
        // console.log('firebase data', data)
        data.forEach((child) => {
          donors.push({
            name: child.val().name,
            email: child.val().email,
            bloodGroup: child.val().bloodGroup,
            address: child.val().address,
            donor: child.val().donor,
            gender: child.val().gender,
            uid: child.val().uid,
            photo: child.val().photo,
            phoneNo: child.val().phoneNo
          });
        });
        dispatch({
          type: 'GetDonor',
          payload: donors,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

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

const createTwoButtonAlert = (title, msg, func) => {
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
      { text: 'OK', onPress: func },
    ],
    { cancelable: false },
  );
};
