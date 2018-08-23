import firebase from 'react-native-firebase';

const db = firebase.database();

const Database = {
  getMarquee: () => {
    const ref = db.ref('daily')
    ref.once('value')
    .then(data => {
      let key = data.key;
      console.log(data.child('dailyMessage').val());
    })
  },
  storeUser: user => {
    const ref = db.ref(`users/${user.uid}`);
    ref.set({
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL
    })
  },
  addToPlaylist: (track, uid) => {
    const ref = db.ref(`users/${uid}/playlist/`);
    ref.update(track)
  },
  fetchPlaylist: user => {
    const ref = db.ref(`users/${user.uid}/playlist`);

    // ref.
  },
  toggleHeart: (track, uid) => {
    track.transaction(item => {
      if(item) {
        if(item.hearts && item.hearts[uid]) {
          item.heartCount--;
          item.hearts[uid] = null;
        } else {
          item.heartCount++;
          if(!item.hearts) {
            item.hearts = {};
          }
          item.hearts[uid] = true;
        }
      }
      return item;
    })
  },

};

export default Database;
