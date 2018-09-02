export const checkObject = object => Object.keys(object).length === 0 && object.constructor === Object;

export function pad(n, width, z = 0) {
  n += '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export const minutesAndSeconds = position => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);

export const objToArray = obj => Array.from(Object.keys(obj), key => obj[key]);

export const filterObject = (obj, query) => {
  const arr = Array.from(Object.keys(obj), key => obj[key]);
  return new Promise((resolve, reject) => {
    if (query.length === 0) return resolve();
    const results = arr.filter(item => item.title.includes(query) || item.artist.includes(query));
    return resolve(results);
  })
    .catch(error => {
      reject(error);
    });
};

export const removeByKey = (obj, delKey) => Object.keys(obj)
  .filter(key => key !== delKey)
  .reduce((result, current) => {
    result[current] = obj[current];
    return result;
  }, {});

export const delay = ms => new Promise(resolve => {
  setTimeout(resolve, ms);
});
