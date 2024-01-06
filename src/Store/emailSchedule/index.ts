import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DomainURL } from "../../Utils/constants";
import { scheduleType } from "../../Types/schedules";
import { Appdispatch } from "..";

const initialState = {
  scheduleList: [] as scheduleType[],
  selectedSchedule: {} as scheduleType,
  isEdit: false,
  loader: false,
};

export const fetchSchedules = createAsyncThunk(
  "appConfig/fetchConfig",
  async () => {
    const response = await axios.get(DomainURL + "schedules");
    return response.data ?? [];
  }
);

export const addSchedules = createAsyncThunk(
  "appConfig/addConfig",
  async (data: scheduleType, { getState, dispatch: appDispatch }: any) => {
    const dispatch = appDispatch as Appdispatch;
    const response = await axios.post(DomainURL + "schedules", data);
    dispatch(fetchSchedules());

    return response;
  }
);

export const updateSchedules = createAsyncThunk(
  "appConfig/updateConfig",
  async (data: scheduleType, { getState, dispatch: appDispatch }) => {
    const dispatch = appDispatch as Appdispatch;

    const response = await axios.put(DomainURL + `schedules/${data.id}`, data);
    dispatch(fetchSchedules());

    return response;
  }
);
export const removeSchedule = createAsyncThunk(
  "appConfig/removeConfig",
  async (id: string | number, { getState, dispatch: appDispatch }) => {
    const dispatch = appDispatch as Appdispatch;

    const response = await axios.delete(DomainURL + `schedules/${id}`);
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
