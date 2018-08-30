import firebase from 'react-native-firebase';

firebase.app();

const channel = new firebase.notifications.Android.Channel(
  'root1337',
  'darknet.fm',
  firebase.notifications.Android.Importance.Max,
).setDescription('darknet.fm is a music app that encourages a hacker-like community ');
firebase.notifications().android.createChannel(channel);

export default firebase;
