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
  },
});

const graphReducer = graphSlice.reducer;
export const { updateTemperature, updateHumidity } = graphSlice.actions;
export default graphReducer;
