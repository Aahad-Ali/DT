import { createSlice } from "@reduxjs/toolkit";
const ResponsiveSideDrawer = createSlice({
    name: "drawer",
    initialState: {
        drawerState: false,
    },
    reducers: {
        openDrawer(state, action) {
            state.drawerState = true;
        },
        closeDrawer(state, action) {
            state.drawerState = false;
        }
    }
})
// Export slice
export default ResponsiveSideDrawer.reducer;
// Export function
export const { openDrawer, closeDrawer } = ResponsiveSideDrawer.actions