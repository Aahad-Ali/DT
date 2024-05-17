import { createSlice } from "@reduxjs/toolkit";
const Filter = createSlice({
    name: "filter",
    initialState: {
        value: "",
        property: "",
        property_sub_type: "",
        maxRent: "",
        minRent: "",
        status: "",
        bedroom: [],
        bathroom: [],
        state: "",
        lease_term: "",
        rollover_end_of_term: false,
        toDate: "",
        fromDate: "",

    },
    reducers: {
        FilterValue(states, action) {
            const { value, property, property_sub_type, minRent, maxRent, status, bedroom, bathroom, state, lease_term, rollover_end_of_term, toDate, fromDate, reset } = action.payload

            if (value) states.value = value;
            if (property) states.property = property;
            if (property_sub_type) states.property_sub_type = property_sub_type;
            if (minRent) states.minRent = minRent;
            if (maxRent) states.maxRent = maxRent;
            if (status) states.status = status;
            if (state) states.state = state;
            if (bedroom) {
                states.bedroom = Object.entries(bedroom).filter(([key, value]) => value).map(([key, value]) => "bedroom[]=" + key).join('&').slice(10);
            }
            if (bathroom) {
                states.bathroom = Object.entries(bathroom).filter(([key, value]) => value).map(([key, value]) => "bathroom[]=" + key).join('&').slice(11);
            }
            if (lease_term) states.lease_term = lease_term
            if (rollover_end_of_term) states.rollover_end_of_term = rollover_end_of_term
            if (toDate) states.toDate = toDate
            if (fromDate) states.fromDate = fromDate
            if (reset) {
                states.value = ""
                states.property = ""
                states.property_sub_type = ""
                states.minRent = ""
                states.maxRent = ""
                states.status = ""
                states.bedroom = ""
                states.bathroom = ""
                states.state = ""
                states.lease_term = ""
                states.rollover_end_of_term = ""
                states.toDate = ""
                states.fromDate = ""
            }
        }
    }
})
// Export slice
export default Filter.reducer;
// Export function
export const { FilterValue } = Filter.actions