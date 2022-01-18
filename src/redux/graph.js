import { createSlice } from "@reduxjs/toolkit";

const graphSlice = createSlice({
  name: "graph",
  initialState: {
    temperature: {
      prefix: "°C",
      data: [],
    },
    humidity: {
      prefix: "%",
      data: [],
    },
  },
  reducers: {
    updateTemperature: (state, { payload }) => {
      state.temperature.data = payload;
    },
    updateHumidity: (state, { payload }) => {
      state.humidity.data = payload;
    },
    updateStat: (state, { payload }) => {
      state[payload.type].data = payload.data;
    },
  },
});

const graphReducer = graphSlice.reducer;
export const { updateTemperature, updateHumidity, updateStat } =
  graphSlice.actions;
export default graphReducer;
