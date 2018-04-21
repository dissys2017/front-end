import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import rootReducer from "../_reducers";

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, loggerMiddleware)
);
