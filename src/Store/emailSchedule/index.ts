import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DomainURL } from "../../Utils/constants";
import { scheduleType } from "../../Types/schedules";

const initialState = {
  scheduleList: [] as scheduleType[],
  selectedSchedule: {} as scheduleType,
  isEdit: false,
  loader: false,
};

export const fetchSchedules = createAsyncThunk(
  "appConfig/fetchConfig",
  async (params) => {
    const response = await axios.get(DomainURL + "schedules");

    return response.data;
  }
);

export const addSchedules = createAsyncThunk(
  "appConfig/addConfig",
  async (data, { getState, dispatch }) => {
    const response = await axios.post(DomainURL + "schedules", data);
    dispatch(fetchSchedules());

    return response;
  }
);

export const updateSchedules = createAsyncThunk(
  "appConfig/addConfig",
  async (data, { getState, dispatch }) => {
    const response = await axios.post(DomainURL + "schedules", data);
    dispatch(fetchSchedules());

    return response;
  }
);

const emailSchedule = createSlice({
  name: "emailschedule",
  initialState: initialState,
  reducers: {
    setIsEdit(state, action) {
      state.isEdit = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchSchedules.fulfilled, (state, action) => {
      state.scheduleList = action.payload;
      state.loader = false;
    });
    builder.addCase(fetchSchedules.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(fetchSchedules.rejected, (state, action) => {
      state.loader = false;
    });
  },
});

export default emailSchedule.reducer;
export const { setIsEdit } = emailSchedule.actions;
