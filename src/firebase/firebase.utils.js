import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDuTWFCNjQj-Ohlxy9wTjEUsLoJd28l4X4',
  authDomain: 'crwn-db-c4acc.firebaseapp.com',
  databaseURL:
    'https://crwn-db-c4acc-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'crwn-db-c4acc',
  storageBucket: 'crwn-db-c4acc.appspot.com',
  messagingSenderId: '22660074500',
  appId: '1:22660074500:web:50e50f5d579b5bdc98f951',
  measurementId: 'G-PP6S6SSY5J',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
