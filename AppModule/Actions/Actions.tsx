// actions.ts
import {
  FETCH_TOKEN,
  FETCH_PLANETS_LIST,
  FETCH_VEhiCLES_LIST,
  ADD_PLANET_LIST,
  ADD_VEHICLE_LIST,
  ADD_TOKEN,
  FIND_FALCONE
} from './ActionsConstants';

export const fetchTokenRequest = () => ({
  type: FETCH_TOKEN,
});

export const fetchPlanetsList = () => ({
  type: FETCH_PLANETS_LIST,
});
export const fetchVehiclesList = () => ({
  type: FETCH_VEhiCLES_LIST,
});
export const addPlanetListToData = planetListData => ({
  type: ADD_PLANET_LIST,
  planetList: planetListData
})
export const addVehicleListToData = vehicleListData => ({
  type: ADD_VEHICLE_LIST,
  vehicleList: vehicleListData
})
export const addTokentoData = tokenValue => ({
  type: ADD_TOKEN,
  token: tokenValue
})

export const findFalcone = data => ({
  type: FIND_FALCONE,
  data
})