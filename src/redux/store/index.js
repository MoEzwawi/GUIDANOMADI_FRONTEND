import { combineReducers, configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "../reducers/propertiesReducer";

const myReducer = combineReducers({
    properties: propertiesReducer
})

const store = configureStore({
    reducer: myReducer
})

export default store