import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import emailschedule from "./emailSchedule";

export const store = configureStore({
  reducer: { emailschedule },
});

export type Appdispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<Appdispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
