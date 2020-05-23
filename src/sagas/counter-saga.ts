import { put, takeEvery, all, select } from "redux-saga/effects";
import { AnyAction } from "redux";
import { State } from "../state";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function* buyBuilding(action: AnyAction) {
  yield put({
    type: "INCREMENT_NUMBER_OF_BUILDINGS",
    buildingType: action.payload.type,
  });
  yield put({ type: "DECREMENT_BY", value: action.payload.price });
  yield put({ type: "INCREMENT_COOKIES_PER_SECOND_BY", value: 0.1 });
}

function* eventLoop() {
  while (true) {
    const state: State = yield select();

    yield put({ type: "INCREMENT_BY", value: state.cookiesPerSecond });
    yield delay(1000);
  }
}

function* watchBuyBuilding() {
  yield takeEvery("BUY_BUILDING", buyBuilding);
}

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INCREMENT" });
}

function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export default function* rootSaga() {
  yield all([watchIncrementAsync(), watchBuyBuilding(), eventLoop()]);
}
