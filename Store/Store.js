import { configureStore } from "@reduxjs/toolkit";
import DropDown from "./Slices/DropDownSlice";
import ResponsiveSideDrawer from './Slices/SideDrawerSlice'
import Search from './Slices/SearchSlice'
import PropertyData from "./Slices/PropertyData";
import Chat from "./Slices/ChatSlice";
import FilterValue from "./Slices/FilterSlice";
const store = configureStore({
    reducer: {
        DropDown: DropDown,
        sideDrawer: ResponsiveSideDrawer,
        Search: Search,
        propertyId: PropertyData,
        Chat: Chat,
        FilterValue: FilterValue
    },
})
export default store;