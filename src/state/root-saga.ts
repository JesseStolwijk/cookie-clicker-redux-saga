import { put, takeEvery, all, select } from "redux-saga/effects";
import { AnyAction } from "redux";
import { State } from ".";
import { abbreviateNumber } from "../abbreviate-number";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function* buyBuilding(action: AnyAction) {
  const state: State = yield select();

  yield put({ type: "DECREMENT_BY", value: action.payload.price });
  yield put({
    type: "INCREMENT_COOKIES_PER_SECOND_BY",
    value: state.buildings[action.payload.type].baseCookiesPerSecond,
  });
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

function* persistState() {
  while (true) {
    yield delay(10000);

    const state: State = yield select();
    yield put({ type: "START_SAVING" });

    localStorage.setItem("state", JSON.stringify(state));

    yield put({ type: "SAVING_FINISHED" });
  }
}

function* updateTabTitle() {
  const state: State = yield select();
  document.title =
    abbreviateNumber(Math.floor(state.numberOfCookies)) + " cookies";
}

function* watchIncrements() {
  yield takeEvery("INCREMENT_BY", updateTabTitle);
  yield takeEvery("INCREMENT", updateTabTitle);
  yield takeEvery("DECREMENT_BY", updateTabTitle);
}

export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
    watchBuyBuilding(),
    eventLoop(),
    persistState(),
    watchIncrements(),
  ]);
}
