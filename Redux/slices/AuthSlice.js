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
export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        toast.loading("Wait! login in your account", {
            position: 'top-center'
        });
        const response = await axiosInstance.post('/user/login', data);
        if (response.status === 200) {
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
export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        toast.loading("Wait! logout in progress", {
            position: 'top-center'
        });
        const response = await axiosInstance.get('/user/logout');
        if (response.status === 200) {
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
export const forgotPassword = createAsyncThunk("/user/forgotPassword", async (data) => {
    try {
        toast.loading("Wait! sending request...", {
            position: 'top-center'
        });
        const response = await axiosInstance.post('/user/forgot-password', data)
        if (response.status === 200) {
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
export const resetPassword = createAsyncThunk("/user/resetPassword", async (data) => {
    try {
        toast.loading("Wait! resetting password...", {
            position: 'top-center'
        });
        const response = await axiosInstance.post(`/user/reset/${data.resetToken}`, {
            password: data.password
        });
        if (response.status === 200) {
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
export const changePassword = createAsyncThunk("/user/changePassword", async (data) => {
    try {
        toast.loading("Wait! changing password..", {
            position: 'top-center'
        });
        const response = await axiosInstance.put('/user/change-password', data);
        if (response.status === 200) {
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
export const editProfile = createAsyncThunk("/user/editProfile", async (data) => {
    try {
        toast.loading("Wait! update profile", {
            position: 'top-center'
        });
        const response = await axiosInstance.put('/user/update', data);
        if (response.status === 200) {
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