import { applyMiddleware, createStore, AnyAction } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./state/root-saga";
import { reducer } from "./state";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
