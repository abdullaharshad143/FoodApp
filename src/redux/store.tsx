import { configureStore } from "@reduxjs/toolkit";
import { UserInfo, userReducer } from "./users/userSlices";

export interface RootState {
    user: UserInfo
}

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;
