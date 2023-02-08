/* eslint-disable prettier/prettier */
import { FETCH_TOKEN_SUCCESS, FETCH_TOKEN_FAILURE, FETCH_PLANETS_LIST_SUCCESS, FETCH_VEhiCLES_LIST_SUCCESS } from '../Actions/ActionsConstants';
const initialState = {
    token: '',
    vehicleData: [],
    planetsData: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOKEN_SUCCESS:
            console.log('\n Inside the Reducer with payload ==>' + action.payload.token);
            return { ...state, token: action.payload.token };
        case FETCH_TOKEN_FAILURE:
            return { ...state, token: action.payload.error.message };
        case FETCH_PLANETS_LIST_SUCCESS:
            return { ...state, planetsData: action.payload }
        case FETCH_VEhiCLES_LIST_SUCCESS:
            return { ...state, vehicleData: action.payload }
        default:
            return state;
    }
};

export default rootReducer;
