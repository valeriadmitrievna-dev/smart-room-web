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
    illumination: {
      prefix: " lux",
      data: [],
    },
    hydrocarbons: {
      prefix: " ppm",
      data: [],
    },
  },
  reducers: {
    addOnePoint: (state, { payload }) => {
      state.temperature.data.push(payload.temperature);
      state.humidity.data.push(payload.humidity);
      state.illumination.data.push(payload.illumination);
      state.hydrocarbons.data.push(payload.hydrocarbons);
    },
  },
});

const graphReducer = graphSlice.reducer;
export const { addOnePoint } = graphSlice.actions;
export default graphReducer;
