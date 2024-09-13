// const axios = require('axios');


// exports.main = async (context = {}) => {
//   const { city } = context.parameters;

//   const coordinates = await getCoordinates(city)
//   console.log(coordinates)

//   const weather = await getWeather(city)
//   console.log(weather)

//   //return response;
// };


// const getCoordinates = async (city) => {
//   const appid = "cba75f0bde502b5c80b2a16758a24928"
//   const coordinates = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${appid}`)
//   //.then(response => console.log(response.data))
//   .then (response => {
//     const lat = response.data[0].lat
//     const lon = response.data[0].lon
//     const coordinates = [lat,lon]
//     console.log('The lattitude is: ', lat)
//     console.log('The coordinates are: ', coordinates)
//     return coordinates
//   })
//   .catch(error => console.error(error));
//   return coordinates
// }

// const getWeather = async (city) => {
//   const coordinates = getCoordinates(city)
//   const appid = "cba75f0bde502b5c80b2a16758a24928"

//   axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${appid}&units=imperial`)
//     .then(response => {
//       const weather = response.data
//       console.log(weather)
//     })
//     .catch((error) => console.error(error));
// }

//require('dotenv').config();
//const APPID = process.env.APPID;
const axios = require('axios');


exports.main = async (context = {}) => {
  const { city } = context.parameters;

  

  // Await getCoordinates since it's an async function
  const coordinates = await getCoordinates(city);
  console.log(coordinates);

  // Await getWeather since it needs coordinates first
  const weather = await getWeather(coordinates);
  console.log(weather);

  return weather

  //return response;
};

const getCoordinates = async (city) => {
  const appid = process.env.APPID
  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${appid}`);
    const lat = response.data[0].lat;
    const lon = response.data[0].lon;
    const coordinates = [lat, lon];
    console.log('The latitude is: ', lat);
    console.log('The coordinates are: ', coordinates);
    return coordinates;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get coordinates');
  }
};

const getWeather = async (coordinates) => {
  const appid = process.env.APPID
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${appid}&units=imperial`);
    const weather = response.data;
    console.log(weather);
    return weather;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get weather data');
  }
};
