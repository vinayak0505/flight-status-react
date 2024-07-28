import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authReducer } from "./reducer/auth.reducer";
import { helperReducer } from "./reducer/helper.reducer";
import { flightReducer } from "./reducer/flight.reducer";
import { ticketReducer } from "./reducer/ticket.reducer";
import { toastMiddleware } from "./middleware/toast.middleware";
import { tokenMiddleware } from "./middleware/token.middleware";

const store = configureStore({
    reducer: {
        authReducer,
        helperReducer,
        flightReducer,
        ticketReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware, toastMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunkDispatch = typeof store.dispatch;

export default store;