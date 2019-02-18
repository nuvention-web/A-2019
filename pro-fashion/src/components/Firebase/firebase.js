import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
apiKey: "AIzaSyBR_Uy5rZW-lvfq_aaDzM-yZP3H_NWCMSg",
authDomain: "profashion.firebaseapp.com",
databaseURL: "https://profashion.firebaseio.com",
projectId: "profashion",
storageBucket: "gs://profashion.appspot.com/",
messagingSenderId: "633591524876"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
    
  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;