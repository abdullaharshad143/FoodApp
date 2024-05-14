import { configureStore } from "@reduxjs/toolkit";
import { UserInfo, userReducer } from "./users/userSlices";
import { produceSlicer } from "./cart/cartSlices";
import { IProduce } from "../core/types";

export interface RootState {
  user: UserInfo
  produce: IProduce
}

const store = configureStore({
  reducer: {
    user: userReducer,
    produce: produceSlicer
  }
});

export default store;
