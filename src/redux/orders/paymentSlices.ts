import { createSlice } from "@reduxjs/toolkit";

export interface PaymentState {
    paymentSuccess: boolean;
}

const initialState: PaymentState = {
    paymentSuccess: false,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState: initialState,
    reducers: {
        setPaymentSuccess: (state, action) => {
            state.paymentSuccess = action.payload;
        },
    },
});

export const { setPaymentSuccess } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
