import { createSlice } from "@reduxjs/toolkit";
const Search = createSlice({
    name: "dropdown",
    initialState: {
        value: "",
    },
    reducers: {
        getValue(state, action) {
            state.value = action.payload;

        },
    }
})
// Export slice
export default Search.reducer;
// Export function
export const { getValue } = Search.actions