import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: false,
    soz: {}
}
export const sozlukSlice = createSlice({
    name: 'tdk',
    initialState,
    reducers: {
        getTdk: state => {
            state.loading = true
        },
        getTdkSuccess: (state, { payload }) => {
            state.soz = payload
            state.loading = false
            // state.hasErrors = false
        },
        getTdkFailure: state => {
            state.loading = false
            // state.hasErrors = true
        },
    },
})

export const { getTdk, getTdkSuccess, getTdkFailure } = sozlukSlice.actions
export const sozlukSelector = state => state
export default sozlukSlice.reducer

