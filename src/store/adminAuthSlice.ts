import { createSlice } from '@reduxjs/toolkit';

export type AdminType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}
interface AuthState {
    admin: AdminType | null;
    loading: boolean;
    error: string | null;
    checked: boolean;
}

const initialState: AuthState = {
    admin: null,
    loading: true,
    error: null,
    checked: false
};

const userAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAdmin(state, action) {
            state.admin = action.payload;
            state.loading = false;
            state.error = null;
            state.checked = true;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
            state.checked = true;
        },
        logout(state) {
            state.admin = null;
            state.loading = false;
            state.error = null;
            state.checked = true
        },
    },

});

export const { setAdmin, setLoading, setError, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;