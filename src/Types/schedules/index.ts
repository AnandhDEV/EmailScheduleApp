import { SelectChangeEvent } from "@mui/material";
import { Dispatch, MouseEvent, SetStateAction } from "react";

export type scheduleType = {
  id: number | string;
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

export type formContainerPropType = {
  scheduleData: scheduleType;
  handleChange: (
    event: SelectChangeEvent<String> | React.ChangeEvent<HTMLInputElement> | any
  ) => void;
  error: Boolean;
  handleClose: () => void;
  handleSubmit: () => void;
};
