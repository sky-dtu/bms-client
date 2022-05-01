import { combineReducers } from "redux";

import authReducer from "./auth";
import userReducer from "./user";
import bookReducer from "./book";
import sectionReducer from "./section";


const reducers = combineReducers({
    isLogged : authReducer,
    userReducer : userReducer,
    bookReducer : bookReducer,
    sectionReducer : sectionReducer,
})


export default reducers;