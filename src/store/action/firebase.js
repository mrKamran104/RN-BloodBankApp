import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
  apiKey: 'AIzaSyDOY3SwPxPcM9xNV1Ut6s4mRuh_Vf-9VCY',
  authDomain: 'rn-bloodbank.firebaseapp.com',
  projectId: 'rn-bloodbank',
  storageBucket: 'rn-bloodbank.appspot.com',
  messagingSenderId: '453541335239',
  appId: '1:453541335239:web:dbbed1de6a8cfab3316ee2',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
