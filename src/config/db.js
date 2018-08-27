import firebase from 'react-native-firebase';

const db = firebase.database();

const Database = {
  storeUser: user => {
    const ref = db.ref(`users/${user.uid}`);
    if(!ref) {
      ref.set({
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL
      })
    } else {
      return;
    }
  },
};

export default Database;
