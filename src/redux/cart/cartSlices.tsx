import { createSlice } from '@reduxjs/toolkit';
import { IProduce } from '../../core/types';

interface ProduceState {
    items: IProduce[];
}

const initialState: ProduceState = {
    items: [],
};

const produceSlice = createSlice({
    name: 'produce',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = { ...action.payload, quantity: 1 };
            state.items.push(newItem);
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateItem(state, action) {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        increaseQuantity(state, action) {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.items[index].quantity = (state.items[index].quantity || 0) + 1;
            }
        },
        decreaseQuantity(state, action) {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1 && state.items[index].quantity !== undefined) {
                state.items[index].quantity = (state.items[index].quantity || 0) - 1
                if (state.items[index].quantity === 0) {
                    state.items.splice(index, 1);
                }
            }
        },
        clearCart: {
            reducer(state) {
                state.items = [];
            },
            prepare() {
                return { payload: undefined };
            }
        },
    },
});

export const { addItem, removeItem, updateItem, increaseQuantity, decreaseQuantity, clearCart } = produceSlice.actions;

export const produceSlicer = produceSlice.reducer;
