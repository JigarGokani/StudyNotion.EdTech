import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            const user = value.payload;
            state.user = user;

            localStorage.setItem("user",JSON.stringify(user));
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
    },
});

export const {setUser,setLoading} = profileSlice.actions;
export default profileSlice.reducer;