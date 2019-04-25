import * as firebase from 'firebase';

const config = {
apiKey: "AIzaSyBR_Uy5rZW-lvfq_aaDzM-yZP3H_NWCMSg",
authDomain: "profashion.firebaseapp.com",
databaseURL: "https://profashion.firebaseio.com",
projectId: "profashion",
storageBucket: "gs://profashion.appspot.com/",
messagingSenderId: "633591524876"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});
export default firebase;