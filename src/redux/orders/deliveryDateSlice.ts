import { createSlice } from "@reduxjs/toolkit";

export interface DeliveryState {
    deliveryDate: string | null;
}

const initialState: DeliveryState = {
    deliveryDate: null,
};

const deliverySlice = createSlice({
    name: 'delivery',
    initialState: initialState,
    reducers: {
        setDeliveryDate: (state, action) => {
            state.deliveryDate = action.payload;
        },
        clearDeliveryDate: (state) => {
            state.deliveryDate = null;
        },
    },
});

export const { setDeliveryDate, clearDeliveryDate } = deliverySlice.actions;


export const deliveryReducer = deliverySlice.reducer;
