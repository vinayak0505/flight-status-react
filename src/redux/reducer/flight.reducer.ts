import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import FlightResponse, { stringToFlightStatus } from "../model/flight/FlightResponse";
import FlightService from "../service/flight.service";

type InitialStateType = {
    flights: FlightResponse[];
    loading: boolean;
    error: string | null;
};

const initialState: InitialStateType = { flights: [], loading: true, error: null };

export const getAllFlights = createAsyncThunk("flights/getAllflights", async (_, thunkApi) => {
    thunkApi.dispatch(flightAction.loading());
    const data = await FlightService.getAllFlight();
    return data;
});

export const updateFlightStatus = createAsyncThunk("flights/updateFlightStatus", async (arg: { flightId: String, flightStatus: String }, thunkApi) => {
    const data = (thunkApi?.getState() as RootState)?.flightReducer;
    
    if(data?.loading || data?.error){
        return data.flights;
    }
    const flights: FlightResponse[] = [];
    data?.flights?.forEach((flight) => {
        flights.push({...flight});
        if (flight.id.toString() === arg.flightId) {
            flights[flights.length - 1].flightStatus = stringToFlightStatus(arg.flightStatus)
        }
    })
    return flights;
});


export const updateGateStatus = createAsyncThunk("flights/updateGateStatus", async (arg: { flightId: String, gateNumber: string }, thunkApi) => {
    const data = (thunkApi?.getState() as RootState)?.flightReducer;
    console.log(data, arg, "data");
    
    if(data?.loading || data?.error){
        return data.flights;
    }
    const flights: FlightResponse[] = [];
    data?.flights?.forEach((flight) => {
        flights.push({...flight});
        if (flight.id.toString() === arg.flightId) {
            flights[flights.length - 1].gateNumber = arg.gateNumber;
        }
    })
    return flights;
});


const flightSlice = createSlice({
    name: "flights",
    initialState: initialState,
    reducers: {
        error: (state, action) => {
            state.flights = [];
            state.loading = false;
            state.error = action.payload;
        },
        loading: (state) => {
            state.loading = true;
            state.error = null;
        }
    },
    /**
     * Generates extra reducers for the given builder.
     *
     * @param {object} builder - The builder object.
     * @return {void}
     */
    extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>): void => {
        builder
            .addCase(getAllFlights.fulfilled, (state, action) => {
                state.flights = action?.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllFlights.rejected, (state, action) => {
                state.error = action?.error?.message ?? null;
                state.flights = [];
                state.loading = false;
            }).addCase(updateFlightStatus.fulfilled, (state, action) => {
                state.flights = action?.payload;
                state.loading = false;
                state.error = null;
            }).addCase(updateGateStatus.fulfilled, (state, action) => {
                state.flights = action?.payload;
                state.loading = false;
                state.error = null;
            });
    },
});

export const flightReducer = flightSlice.reducer;
export const flightAction = flightSlice.actions;
export const flightSelector = (state: RootState) => state.flightReducer;