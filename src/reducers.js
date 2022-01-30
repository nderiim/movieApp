import {combineReducers} from "redux";
import {movieReducer} from "./screens/reducers";

const rootReducer = combineReducers({
  movieReducer: movieReducer,
});

export default rootReducer;