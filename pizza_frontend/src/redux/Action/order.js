import axios from "axios"
import { server } from "../../server"

export const getAllOrder = () => async (dispatch) => {

    try {
        dispatch({
            type:"getAllOrderRequest",
        })
        const {data} = await axios.get(`${server}/order`,{
            withCredentials: true,
        });

        dispatch({
            type:"getAllOrderSuccess",
            payload: data.payload.orders,
        })
    } catch (error) {
        dispatch({
            type:"getAllOrderFail",
            payload: error.response.data.message,
        })
    }
}

export const getSingleOrder = (id) => async (dispatch) => {

    try {
        dispatch({
            type:"getSingleOrderRequest",
        })
        const {data} = await axios.get(`${server}/order/${id}`,{
              withCredentials: true,
        });

        dispatch({
            type:"getSingleOrderSuccess",
            payload: data.payload.order,
        })
    } catch (error) {
        dispatch({
            type:"getSingleOrderFail",
            payload: error.response.data.message,
        })
    }
}


export const getAllOrdersForAdmin = () => async (dispatch) => {

    try {
        dispatch({
            type:"getAllOrderAdminRequest",
        })
        const {data} = await axios.get(`${server}/order/admin`,{
            withCredentials: true,
        });

        dispatch({
            type:"getAllOrderAdminSuccess",
            payload: data.payload.orders,
        })
    } catch (error) {
        dispatch({
            type:"getAllOrderAdminFail",
            payload: error.response.data.message,
        })
    }
}