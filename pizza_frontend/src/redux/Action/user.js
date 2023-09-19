import axios from "axios";
import { server } from "../../server";
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "loadUserRequest",
        })
        const {data} = await axios.get(`${server}/api/user/me`,{
            withCredentials: true,
        })
        dispatch({
            type: "loadUserSuccess",
            payload: data.payload.user,
        })
    } catch (error) {
        dispatch({
            type: "loadUserFail",
            payload: error.response.data.message,
        })
    }
}
export const getAllUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllUserRequest",
        })
        const {data} = await axios.get(`${server}/api/user`,{
            withCredentials: true,
        })
        dispatch({
            type: "getAllUserSuccess",
            payload: data.payload.users,
        })
    } catch (error) {
        dispatch({
            type: "getAllUserFail",
            payload: error.response.data.message,
        })
    }
}

export const createUser = (name, email, password, phone, address, image) => async (dispatch) => {
    try {
        dispatch({
            type: "createUserRequest",
        })
        const {data} = await axios.post(`${server}/api/user/register`,{
            name, email, password, phone, address, image
        },{
            withCredentials: true,
        });

        dispatch({
            type: "createUserSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "createUserFail",
            payload: error.response.data.message,
        })
    }
}

export const loginUser = (email,password) => async (dispatch) => {
    try {
        dispatch({
            type: "loginUserRequest",
        })
        const {data} = await axios.post(`${server}/api/auth/login`,{
           email,password
        },{
            withCredentials: true,
        });
        
        dispatch({
            type: "loginUserSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "loginUserFail",
            payload: error.response.data.message,
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutUserRequest",
        })
        const {data} = await axios.get(`${server}/api/auth/logout`,{
            withCredentials: true,
        });
        
        dispatch({
            type: "logoutUserSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "logoutUserFail",
            payload: error.response.data.message,
        })
    }
}

export const updateUser = (name, password, phone, address, image) => async (dispatch) => {
    try {
        dispatch({
            type: "updateUserRequest",
        })
        const {data} = await axios.put(`${server}/api/user/update`,{
            name, password, phone, address, image
        },{
            withCredentials: true,
        });

        dispatch({
            type: "updateUserSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "updateUserFail",
            payload: error.response.data.message,
        })
    }
}

export const updateUserPassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: "updateUserPasswordRequest",
        })
        const {data} = await axios.put(`${server}/api/user/update-password`,{
            oldPassword, newPassword
        },{
            withCredentials: true,
        });

        dispatch({
            type: "updateUserPasswordSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "updateUserPasswordFail",
            payload: error.response.data.message,
        })
    }
}
