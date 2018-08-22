export const checkObject = object => {
  return Object.keys(object).length === 0 && object.constructor === Object
};

export function pad(n, width, z=0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

export const minutesAndSeconds = position => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);

export const filterArrayOfObjects = (array, query) => {
  return new Promise((resolve, reject) => {
    let results = array.filter(item => {
      return item.title.includes(query) || item.artist.includes(query)
    })
    return resolve(results);
  })
  .catch(error => {
    reject(error);
  })
};
