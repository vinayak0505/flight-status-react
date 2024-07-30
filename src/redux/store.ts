import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authReducer } from "./reducer/auth.reducer";
import { helperReducer } from "./reducer/helper.reducer";
import { flightReducer } from "./reducer/flight.reducer";
import { ticketReducer } from "./reducer/ticket.reducer";
import { toastMiddleware } from "./middleware/toast.middleware";
import { tokenMiddleware } from "./middleware/token.middleware";

// store toolkit
// used to configure store
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
// useappdispath can used instead of useDispatch
// this will provide app context during development time also
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;