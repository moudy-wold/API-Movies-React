import { createSlice, current } from "@reduxjs/toolkit";


export const infoFun = createSlice({
    name: "details",
    initialState: {
        dataIsEmpty: true,
        searchInputValue: "",
    },
    reducers: {
        // For Handle Search Proces
        handleSearch: (state, action) => {
            action.payload.e != "" ? state.dataIsEmpty = false : state.dataIsEmpty = true;
            state.searchInputValue = action.payload.e;
        }
    }
})

export const { handleSearch } = infoFun.actions;
export default infoFun.reducer