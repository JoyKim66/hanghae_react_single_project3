import { createStore, combineReducers, applyMiddleware } from "redux";
import post from "./modules/post";

const rootReducer = combineReducers({post});

const store = createStore(rootReducer);

export default store;