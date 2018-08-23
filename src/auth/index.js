import firebase from '../config/firebase';
import Auth from '../config/auth';
import Database from '../config/db';
import { fbPermissions } from '../constants';
import { FBLoginManager } from 'react-native-facebook-login';

export const fbLogin = () => {
  return new Promise((resolve, reject) => {
    Auth.Facebook.login(fbPermissions)
    .then(token => {
      firebase.auth()
      .signInAndRetrieveDataWithCredential(firebase.auth.FacebookAuthProvider.credential(token))
      .then(data => {
        Database.storeUser(data.user._user);
        return resolve(data.additionalUserInfo)
      })
    })
    .catch(err => {
      return reject(err);
    })
  })
};

export const fbLogout = () => {
  return firebase.auth().signOut();
};

export const fetchUser = updateUserInfo => {
  firebase.auth().onAuthStateChanged(user => {
    if(!user) {
      return null;
    } else {
      updateUserInfo(user);
    }
  })
};
