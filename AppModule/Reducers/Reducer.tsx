/* eslint-disable prettier/prettier */
import {
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN_FAILURE,
  FETCH_PLANETS_LIST_SUCCESS,
  FETCH_VEhiCLES_LIST_SUCCESS,
  ADD_PLANET_LIST,
  ADD_VEHICLE_LIST,
  ADD_TOKEN,
  FIND_FALCONE_SUCCESS
} from '../Actions/ActionsConstants';

const initialState = {
  token: '',
  vehicleData: [],
  planetsData: [],
  requestData: {
    token: '',
    planet_names: [],
    vehicle_names: []
  },
  response: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOKEN_SUCCESS:
      // console.log('\n Inside the Reducer with payload ==>' + action.payload.token);
      return { ...state, token: action.payload.token };
    case FETCH_TOKEN_FAILURE:
      return { ...state, token: action.payload.error.message };
    case FETCH_PLANETS_LIST_SUCCESS:
      return { ...state, planetsData: action.payload }
    case FETCH_VEhiCLES_LIST_SUCCESS:
      return { ...state, vehicleData: action.payload }
    case ADD_PLANET_LIST:
      {
        const { planetList } = action
        console.log('======>>>Inside Reducer' + JSON.stringify(planetList))
        return {
          ...state, requestData: { ...state.requestData, planet_names: planetList }
        }
      }
    case ADD_VEHICLE_LIST:
      {
        const { vehicleList } = action
        return {
          ...state, requestData: { ...state.requestData, vehicle_names: vehicleList }
        }
      }
    case ADD_TOKEN: {
      const { token } = action
      return {
        ...state, requestData: { ...state.requestData, token: token }
      }
    }
    case FIND_FALCONE_SUCCESS:
      return { ...state, response: action.payload }
    default:
      return state;
  }
};

export default rootReducer;
