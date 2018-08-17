import { fbPermissions } from '../../constants';
import firebase from '../../config/firebase';
import Auth from '../../config/auth';

export const fbLogin = () => (
  Auth.Facebook.login(fbPermissions)
    .then((token) => {
      firebase.auth()
      .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token))
    })
    .catch((err) => {
      console.log(err);
      this.onError && this.onError(err)
    })
);

export const fbLogout = () => (
  Auth.Facebook.logout()
  .then(() => {
    console.log('logged out');
  })
);
