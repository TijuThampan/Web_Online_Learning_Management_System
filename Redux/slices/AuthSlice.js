import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

import axiosInstance from '../../Helpers/AxiosInstance'

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {}
}

export const signup = createAsyncThunk("/auth/signup", async (data) => {
    try {
        toast.loading("Wait! Creating your account", {
            position: 'top-center'
        });
        const response = await axiosInstance.post('/user/signup', data);
        if (response.status === 201) {
            toast.dismiss();
            toast.success(response.data.message);
            return response.data;
        } else {
            toast.dismiss();
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.message);
        throw error;
    }
});

export default authSlice.reducer