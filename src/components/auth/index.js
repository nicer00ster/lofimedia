import { fbLoginPermissions } from '../../constants';
import firebase from '../../config/firebase';
import Auth from '../../config/auth';

export const handleFbLogin = () => (
  Auth.Facebook.login(fbLoginPermissions)
    .then((token) => {
      firebase.auth()
      .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token))
    })
    .catch((err) => {
      console.log(err);
      this.onError && this.onError(err)
    })
);

export const handleFbLogout = () => (
  Auth.Facebook.logout()
  .then(() => {
    console.log('logged out');
  })
);
