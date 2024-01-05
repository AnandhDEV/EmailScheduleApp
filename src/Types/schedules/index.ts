import { Dispatch, MouseEvent, SetStateAction } from "react";

export type scheduleType = {
  id: number;
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeat: string;
  time: string;
};

export type scheduleTableProptype = {
  rows: scheduleType[];
  setFormData: Dispatch<SetStateAction<scheduleType>>;
  handleOpenMenu: (e: MouseEvent<HTMLElement>) => void;
};
