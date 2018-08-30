import firebase from 'react-native-firebase';

const db = firebase.database();

const Database = {
  storeUser: user => {
    const ref = db.ref(`users/${user.uid}`);
    ref.once('value').then(snapshot => {
      if (snapshot.exists()) return;
      ref.set({
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        uid: user.uid,
        superuser: false,
        notifications: true,
      });
    });
  },
};

export default Database;
