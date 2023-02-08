// actions.ts
import { FETCH_TOKEN, FETCH_PLANETS_LIST, FETCH_VEhiCLES_LIST } from './ActionsConstants';

export const fetchTokenRequest = () => ({
  type: FETCH_TOKEN
});

export const fetchPlanetsList = () => ({
  type: FETCH_PLANETS_LIST
});
export const fetchVehiclesList = () => ({
  type: FETCH_VEhiCLES_LIST
});
