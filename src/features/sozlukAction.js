import axios from "axios"
import { getTdk, getTdkFailure, getTdkSuccess } from "./sozlukSlice"

export function fetchTdkSearching(searching) {
    return async dispatch => {
        dispatch(getTdk())
        try {
            const { data } = await axios.get(`https://sozluk.gov.tr/gts?ara=${searching}`)
            dispatch(getTdkSuccess(data[0]))
        } catch (error) {
            dispatch(getTdkFailure())
        }
    }
}

export function fetchTdk(num) {
    return async dispatch => {
        dispatch(getTdk())
        try {
            const { data } = await axios.get(`https://sozluk.gov.tr/gts_id?id=${num}`)
            dispatch(getTdkSuccess(data[0]))
        } catch (error) {
            dispatch(getTdkFailure())
        }
    }
}


