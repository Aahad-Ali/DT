import { createSlice } from "@reduxjs/toolkit";
const Chat = createSlice({

    name: "dropdown",
    initialState: {
        online: false,
        socket: null,
        conversation: [],
        read: true
    },
    reducers: {

        OnlineOffline(state, action) {
            state.online = action.payload;
        },
        socket(state, action) {
            return {
                ...state,
                socket: action.payload
            }
        },
        conversation(state, action) {
            state.conversation = action.payload
        },
        convoRead(state, action) {
            state.read = action.payload;
        }

    }
})
// Export slice
export default Chat.reducer;
// Export function
export const { OnlineOffline, socket, conversation, convoRead } = Chat.actions