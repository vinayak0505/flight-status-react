import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import TicketResponse from "../model/ticket/TicketResponse";
import TicketService from "../service/ticket.service";

type InitialStateType = {
    tickets: TicketResponse[];
    loading: boolean;
    error: string | null;
};

const initialState: InitialStateType = { tickets: [], loading: true, error: null };

export const getAllTickets = createAsyncThunk("tickets/getAllTickets", async (_, thunkApi) => {
    thunkApi.dispatch(ticketAction.loading());
    const data = await TicketService.getTicketsByUserId();
    return data;
});


const ticketSlice = createSlice({
    name: "tickets",
    initialState: initialState,
    reducers: {
        error: (state, action) => {
            state.tickets = [];
            state.loading = false;
            state.error = action.payload;
        },
        loading: (state) => {
            state.loading = true;
            state.error = null;
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>): void => {
        builder
            .addCase(getAllTickets.fulfilled, (state, action) => {
                state.tickets = action?.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllTickets.rejected, (state, action) => {
                state.error = action?.error?.message ?? null;
                state.tickets = [];
                state.loading = false;
            });
    },
});

export const ticketReducer = ticketSlice.reducer;
export const ticketAction = ticketSlice.actions;
export const ticketSelector = (state: RootState) => state.ticketReducer;