import { createSlice } from '@reduxjs/toolkit';
export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
});
console.log(UserSlice);
export const{setUser} = UserSlice.actions;
export default UserSlice.reducer;