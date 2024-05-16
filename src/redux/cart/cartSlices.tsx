import { createSlice } from '@reduxjs/toolkit';
import { IProduce } from '../../core/types';

interface ProduceState {
    items: (IProduce & { quantity: number })[];
    totalPrice: number; // Separate variable for total price
}

const initialState: ProduceState = {
    items: [],
    totalPrice: 0,
};

const produceSlice = createSlice({
    name: 'produce',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = { ...action.payload, quantity: 1 };
            state.items.push(newItem);
            state.totalPrice += newItem.price; // Update total price when adding item
        },
        removeItem(state, action) {
            const removedItemIndex = state.items.findIndex(item => item.id === action.payload);
            if (removedItemIndex !== -1) {
                const removedItem = state.items[removedItemIndex];
                state.items.splice(removedItemIndex, 1);
                state.totalPrice -= removedItem.price * (removedItem.quantity || 1); // Update total price when removing item
            }
        },
        increaseQuantity(state, action) {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.items[index].quantity = (state.items[index].quantity || 0) + 1;
                state.totalPrice += state.items[index].price; // Update total price when increasing quantity
            }
        },
        decreaseQuantity(state, action) {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1 && state.items[index].quantity !== undefined) {
                state.items[index].quantity = (state.items[index].quantity || 0) - 1;
                state.totalPrice -= state.items[index].price; // Update total price when decreasing quantity
                if (state.items[index].quantity === 0) {
                    state.items.splice(index, 1);
                }
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalPrice = 0; // Reset total price when clearing cart
        },
    },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } = produceSlice.actions;

export const produceReducer = produceSlice.reducer;
