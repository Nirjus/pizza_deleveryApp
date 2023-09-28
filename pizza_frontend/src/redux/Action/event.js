import axios from "axios"
import { server } from "../../server"

export const getAllEvent = () => async (dispatch) => {

    try {
        dispatch({
            type: "getAllEventRequest",
        })
        const {data} = await axios.get(`${server}/api/event`);
        dispatch({
            type: "getAllEventSuccess",
            payload: data.payload.events,
        })
    } catch (error) {
           dispatch({
            type: "getAllEventFail",
            payload: error.response.data.message,
           })   
    }
}

export const getAllEventForAdmin = () => async (dispatch) => {

    try {
        dispatch({
            type: "getAllEventAdminRequest",
        })
        const {data} = await axios.get(`${server}/api/event/admin`,{
            withCredentials: true,
        });
        dispatch({
            type: "getAllEventAdminSuccess",
            payload: data.payload.events,
        })
    } catch (error) {
           dispatch({
            type: "getAllEventAdminFail",
            payload: error.response.data.message,
           })   
    }
}

export const createEvent = (name, description, stock, price) => async (dispatch) => {

    try {
        dispatch({
            type: "createEventRequest",
        })
        const {data} = await axios.post(`${server}/api/event/create`,{
            name, description, stock, price
        },{
            withCredentials: true,
        });
        dispatch({
            type: "createEventSuccess",
            payload: data.message,
        })
    } catch (error) {
           dispatch({
            type: "createEventFail",
            payload: error.response.data.message,
           })   
    }
}