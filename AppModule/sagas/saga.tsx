/* eslint-disable prettier/prettier */
import { call, put, takeLatest, delay, all } from 'redux-saga/effects';
import {
  FETCH_TOKEN_FAILURE,
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN,
  FETCH_PLANETS_LIST_FAILURE,
  FETCH_PLANETS_LIST_SUCCESS,
  FETCH_PLANETS_LIST,
  FETCH_VEhiCLES_LIST_FAILURE,
  FETCH_VEhiCLES_LIST_SUCCESS,
  FETCH_VEhiCLES_LIST
} from '../Actions/ActionsConstants';
import {loadTokenAPI,loadPlanetList,loadVehicleList} from '../Network/networks'

const success = (response: { data: any; }, value: string) => {
  return {
    type: value,
    payload: response.data,
  };
};
const error = (Error: { message: any; }, value: string) => {
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
    yield put(error(error, FETCH_TOKEN_FAILURE));
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
    const response = yield call(loadVehicleList)
    yield put(success(response, FETCH_VEhiCLES_LIST_SUCCESS))
  } catch (error) {
    yield put(error(error, FETCH_VEhiCLES_LIST_FAILURE));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(FETCH_TOKEN, fetchToken),
    takeLatest(FETCH_PLANETS_LIST, fetchPlanetsList),
    takeLatest(FETCH_VEhiCLES_LIST, fetchVehiclesList)
  ])
}
export default rootSaga;
