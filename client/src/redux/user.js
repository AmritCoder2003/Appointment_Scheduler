import { createSlice } from '@reduxjs/toolkit';
export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        reloadUser: true
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        reloadUserData:(state,action)=>{
            state.reloadUser=action.payload;
        }

    }
});
// console.log(UserSlice);
export const{setUser,reloadUserData} = UserSlice.actions;
export default UserSlice.reducer;