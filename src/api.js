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
