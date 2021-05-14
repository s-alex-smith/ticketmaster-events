import { key } from "./apiKey";
const axios = require("axios");

const apiKey = key.ticketMasterKey;
const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&locale=*&countryCode=GB&segmentName=music&size=10`;

export const getEvents = (artist, city, venue, page) => {
    return axios
      .get(`${url}&keyword=${artist}%20${venue}&city=${city}&page=${page}`)
      .then((response) => {
        return response.data._embedded.events;
      })
      .catch((err) => console.log(err));
  };

export const getEventsByGenre = (artist, city, venue, genre, page) => {
  return axios
    .get(
      `${url}&keyword=${artist}%20${venue}&city=${city}&classificationName=${genre}&page=${page}`
    )
    .then((response) => {
      return response.data._embedded.events;
    })
    .catch((err) => console.log(err));
};

export const getAllVenues = () => {
  return axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/venues?apikey=8QNSx93F1F2NNbUwl1pgsC7aEHbk20nu&keyword=manchester%20o2%20apollo&locale=*&size=1&countryCode=GB`
    )
    .then((response) => {
      return response.data._embedded.venues[0];
    })
    .catch((err) => console.log(err));
};
