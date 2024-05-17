import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from 'Helpers/config.json'
// Define the initial state
const initialState = {
    data: [],
    loading: false,
    error: null,
};
export const fetchProperty = createAsyncThunk(
    'data/fetchData',
    async () => {
        try {
            const response = await fetch(`${config.baseUrl}/api/property`, { method: "GET", headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }, });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
)
const Property = createSlice({
    name: "dropdown",
    initialState,
    reducers: {
        GetPropertyId(state, action) {
            state.value = action.payload;
        },
    }
})
// Export slice
export default Property.reducer;
// Export function
export const { GetPropertyId } = Property.actions