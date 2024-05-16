import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { UserInfo, userReducer } from "./users/userSlices";
import { produceReducer } from "./cart/cartSlices";
import { IProduce } from "../core/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RootState {
  user: UserInfo
  produce: IProduce
}
const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
};
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    produce: produceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
export const persistor = persistStore(store);

export default store;
