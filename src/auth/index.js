import { fbPermissions } from '../constants';
import firebase from '../config/firebase';
import Auth from '../config/auth';
import { FBLoginManager } from 'react-native-facebook-login';

export const fbLogin = () => {
  return new Promise((resolve, reject) => {
    Auth.Facebook.login(fbPermissions)
    .then(token => {
      firebase.auth()
      .signInAndRetrieveDataWithCredential(firebase.auth.FacebookAuthProvider.credential(token))
      .then(data => {
        return resolve(data.additionalUserInfo);
      })
    })
    .catch(err => {
      console.log(err);
      return reject;
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
      updateUserInfo(user.providerData);
    }
  })
};
