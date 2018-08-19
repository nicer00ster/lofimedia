import { fbLogin } from './components/auth/index';

export const apiMusic = async () => {
  try {
    const res = await fetch('https://lofi-media.firebaseio.com/tracks.json');
    const data = await res.json();
    return data;
  } catch(error) {
    console.log(error);
  };
};

export const apiDaily = async () => {
  try {
    const res = await fetch('https://lofi-media.firebaseio.com/daily.json');
    const data = await res.json();
    return data;
  } catch(error) {
    console.log(error);
  };
};

export const apiUser = async (userId, token) => {
  try {
    const res = await fetch(`https://graph.facebook.com/v2.3/${userId}/picture?width=400&redirect=false&access_token=${token}`);
    const user = await res.json();
    return user;
  } catch(error) {
    console.log(error);
  };
};
