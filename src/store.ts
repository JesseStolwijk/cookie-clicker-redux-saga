import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./state/root-saga";
import { reducer } from "./state";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reHydrateStore = () => {
  const oldState = localStorage.getItem("state");

  if (oldState !== null) {
    try {
      return JSON.parse(oldState);
    } catch (e) {
      console.error("Failed to load save game", e);
      try {
        localStorage.removeItem("state");
      } catch (e) {
        console.error("Failed to remove state from localstorage");
      }
    }
  }
};

export const store = createStore(
  reducer,
  reHydrateStore(),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
