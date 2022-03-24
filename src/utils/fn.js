const axios = require('axios');
const config = require('../config');

function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function pick(obj, keys) {
  return keys
    .reduce((acc, key) => {
      if (obj[key] !== undefined) acc[key] = obj[key];
      return acc;
    }, {});
}

const ONE_DAY = 1000 * 60 * 60 * 24;

function calcDaysDifference(date1, date2) {
  const differenceMs = Math.abs(date1 - date2);
  return Math.round(differenceMs / ONE_DAY);
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function createRangeBetweenDates(d1, d2, interval) {
  let x = new Date(d1);
  const result = [];
  while (d2 >= x) {
    const next = new Date(x.getTime() + interval);
    result.push({ start: x, end: next });
    x = next;
  }
  return result;
}

function changeObjectToVisibilityStatus(obj) {
  const changedObject = Object.assign(obj);
  if (obj.statusChangeDate && obj.statusChangeDate <= new Date()) changedObject.status = 'visible';
  return changedObject;
}

function changeArrayToVisibilityStatus(objects) {
  return objects.map((x) => (changeObjectToVisibilityStatus(x)));
};

// ip init
let ip;
if (process.env.NODE_ENV === 'development_local') {
  axios.get('https://api.ipify.org?format=json')
    .then(res => ip = res.data.ip);
}
// to get my external ip for local development
function getMyLocalIP() {
  return config.NODE_ENV === 'development_local' ? ip : null;
}

function textDurationToHours(duration) {
  const durations = {
    'none': 0,
    'One hour': 1,
    'Two hours': 2,
    'Three hours': 3,
    'Four hours': 4,
    'Five hours': 5,
    'Six hours': 6,
  };

  return durations[duration];
}

module.exports = {
  wait,
  pick,
  addDays,
  calcDaysDifference,
  createRangeBetweenDates,
  changeArrayToVisibilityStatus,
  changeObjectToVisibilityStatus,
  getMyLocalIP,
  textDurationToHours,
}
