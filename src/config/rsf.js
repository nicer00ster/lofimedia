import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseApp = firebase.initializeApp({
  databaseURL: 'https://lofi-media.firebaseio.com',
  projectId: 'lofi-media',
  appId: '1:1081113158562:android:7a01946919f9c43f',
  messagingSenderId: '1081113158562',
  apiKey: 'AIzaSyCM2eUuLZu2x6NFoGtWTTX2ug4M81dydVs',
  storageBucket: 'lofi-media.appspot.com'
});

const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;
