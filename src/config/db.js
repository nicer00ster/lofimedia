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
  addToPlaylist: (track, uid, key) => {
    const ref = db.ref(`users/${uid}/playlist/${key}`);
    ref.update(track)
  },
  getPlaylist: uid => {
    const ref = db.ref(`users/${uid}/playlist`);
    const data = ref.once('value')
    .then(data => {
      return data.val();
    })
    return data;
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
  addTrack: (artist, title, mp3url, photoURL) => {
    const key = db.ref().child('tracks').push().key;
    let data = {
      artist: artist,
      title: title,
      mp3url: mp3url,
      photoURL: photoURL,
      uid: key
    }
    const updates = {};
    updates[`/tracks/${key}`] = data;
    return db.ref().update(updates);
  },
};

export default Database;
