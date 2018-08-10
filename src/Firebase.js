import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDs2A1VmBieMPCvgU_nFDBZ2BbCBqH9Lqs",
  authDomain: "jfddl5-b6726.firebaseapp.com",
  databaseURL: "https://jfddl5-b6726.firebaseio.com",
  projectId: "jfddl5-b6726",
  storageBucket: "jfddl5-b6726.appspot.com",
  messagingSenderId: "60397367540"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.database();