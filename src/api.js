export const apiMusic = async () => {
  try {
    const res = await fetch('https://api.clyp.it/featuredlist/featured');
    const data = await res.json();
    return data;
  } catch(error) {
    console.log(error);
  }
};
