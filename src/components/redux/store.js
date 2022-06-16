import { configureStore } from "@reduxjs/toolkit";
import infoFun from "./reducerSlice";

export const store = configureStore({
    reducer: {
        info: infoFun
    }
})