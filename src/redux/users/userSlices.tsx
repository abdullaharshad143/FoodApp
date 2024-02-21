import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
    name: string
    email: string
    password: string
    uID: string
    phoneNumber: string
    address:{
        postalCode?: string
        sector?: string
        streetNo?: string
        houseNo?: string
        deliveryNote?: string
    }
}

const initialState: UserInfo = {
    name: '',
    email: '',
    password: '',
    uID: '',
    phoneNumber: '',
    address:{
        postalCode: '',
        sector: '',
        streetNo: '',
        houseNo: '',
        deliveryNote: '',
    }
}

export const usersSlices = createSlice({
    name: 'users',
    initialState: initialState,
    reducers:{
        setUser: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        setAddress: (state, action) => {
            state.address = {
                ...state.address,
                ...action.payload
            }
        },
        clearAddress : (state) => {
            state.address = {}
        },
        clearUser: (state) => {
            state.name = '',
            state.email = '',
            state.password = '',
            state.uID = '',
            state.phoneNumber = ''
        },
    },
})

export const { setUser, setAddress, clearAddress, clearUser} = usersSlices.actions
export const userReducer = usersSlices.reducer