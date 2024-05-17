import { createSlice } from "@reduxjs/toolkit";
const DropDown = createSlice({
    name: "dropdown",
    initialState: {
        openDropdownId: null,
    },
    reducers: {
        dropdownOpen(state, action) {
            const id = action.payload;
            state.openDropdownId = id;
        },
        dropdownClose(state, action) {
            state.openDropdownId = null;
        }
    }
})
// Export slice
export default DropDown.reducer;
// Export function
export const { dropdownOpen, dropdownClose } = DropDown.actions