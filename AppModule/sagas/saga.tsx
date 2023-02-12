/* eslint-disable prettier/prettier */
import {call, put, takeLatest, all} from 'redux-saga/effects';
import {
  FETCH_TOKEN_FAILURE,
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN,
  FETCH_PLANETS_LIST_FAILURE,
  FETCH_PLANETS_LIST_SUCCESS,
  FETCH_PLANETS_LIST,
  FETCH_VEhiCLES_LIST_FAILURE,
  FETCH_VEhiCLES_LIST_SUCCESS,
  FETCH_VEhiCLES_LIST,
  FIND_FALCONE,
  FIND_FALCONE_SUCCESS,
  FIND_FALCONE_FAILURE,
} from '../Actions/ActionsConstants';
import axios from 'axios';
import {
  loadTokenAPI,
  loadPlanetList,
  loadVehicleList,
} from '../Network/networks';

const success = (response: {data: any}, value: string) => {
  return {
    type: value,
    payload: response.data,
  };
};
const error = (Error: {message: any}, value: string) => {
  return {
    type: value,
    payload: Error.message,
  };
};

function* fetchToken() {
  try {
    const response = yield call(loadTokenAPI);
    yield put(success(response, FETCH_TOKEN_SUCCESS));
  } catch (error) {
    yield put(error(error.message, FETCH_TOKEN_FAILURE));
  }
}

//Planets List Saga
function* fetchPlanetsList() {
  try {
    const response = yield call(loadPlanetList);
    console.log('PlanetsList' + JSON.stringify(response.data));
    yield put(success(response, FETCH_PLANETS_LIST_SUCCESS));
  } catch (error) {
    yield put(error(error, FETCH_PLANETS_LIST_FAILURE));
  }
}
//Vehicles List Saga
function* fetchVehiclesList() {
  try {
    const response = yield call(loadVehicleList);
    yield put(success(response, FETCH_VEhiCLES_LIST_SUCCESS));
  } catch (error) {
    yield put(error(error, FETCH_VEhiCLES_LIST_FAILURE));
  }
}
//Final Result Saga
function* fetchResultSaga(action) {
  try {
    const {data} = action;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const makeApiCall = () =>
      axios.post('https://findfalcone.herokuapp.com/find', data, {headers});
    const response = yield call(makeApiCall);
    yield put(success(response, FIND_FALCONE_SUCCESS));
  } catch (error) {
    yield put(error(error, FIND_FALCONE_FAILURE));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(FETCH_TOKEN, fetchToken),
    takeLatest(FETCH_PLANETS_LIST, fetchPlanetsList),
    takeLatest(FETCH_VEhiCLES_LIST, fetchVehiclesList),
    takeLatest(FIND_FALCONE, fetchResultSaga),
  ]);
}
export default rootSaga;
