import axios from 'axios';
import {
  TOKEN_API_URL,
  PLANETS_API_URL,
  VEHICLE_API_URL,
} from '../Constants';
const headers = {
  Accept: 'application/json',
};
export const loadTokenAPI = async () => {
  return await axios.post(TOKEN_API_URL, [], {headers: headers});
};
export const loadPlanetList = async () => {
  return await axios.get(PLANETS_API_URL);
};
export const loadVehicleList = async () => {
  return await axios.get(VEHICLE_API_URL);
};

export const postData = async (endpoint, data, headers) => {
  return await axios
    .create({
      headers,
    })
    .post(endpoint, data);
};
