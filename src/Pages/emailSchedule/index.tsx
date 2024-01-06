import {
  Button,
  Menu,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import ListView from "./listView";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { useAppDispatch, useAppSelector } from "../../Store";
import {
  addSchedules,
  fetchSchedules,
  setIsEdit,
  updateSchedules,
} from "../../Store/emailSchedule";
import { scheduleType } from "../../Types/schedules";
import Fade from "@mui/material/Fade";
import FormContainer from "./formContainer";
import { v4 as uuidv4 } from "uuid";
import PreLoader from "../../Component/backDropLoader";
import CustomSnackBar from "../../Component/SnackBar";
import { unwrapResult } from "@reduxjs/toolkit";

const initialSchedule = {
  id: "",
  title: "",
  description: "",
  subject: "",
  frequency: "",
  repeat: "",
  time: "",
};

const initialSnack = {
  openSnack: false,
  message: "",
  severity: "success",
};

const successAddSnack = {
  openSnack: true,
  message: "Succesfully Created Schedule",
  severity: "success",
};

const successUpdateSnack = {
  openSnack: true,
  message: "Succesfully Updated Schedule",
  severity: "success",
};

const errorSnack = {
  openSnack: true,
  message: "Something went wrong",
  severity: "error",
};

function EmailSchedule() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSchedules());
  }, []);

  const { scheduleList, isEdit, loader } = useAppSelector(
    (state) => state.emailschedule
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [scheduleData, setScheduleData] =
    useState<scheduleType>(initialSchedule);
  const [error, setError] = useState(false);
  const [snack, setSnack] = useState({
    openSnack: false,
    message: "",
    severity: "success",
  });
  const { openSnack, message, severity } = snack;

  const open = Boolean(anchorEl);
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredRow = useMemo(
    () =>
      scheduleList.filter(
        (schedule: scheduleType) =>
          (schedule.title &&
            schedule.title
              .toLowerCase()
              .includes(deferredQuery.toLowerCase())) ||
          (schedule.description &&
            schedule.description
              .toLowerCase()
              .includes(deferredQuery.toLowerCase()))
      ) ?? [],
    [deferredQuery, scheduleList]
  );

  const handleCloseSnack = () => {
    setSnack(initialSnack);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleReset = () => {
    setAnchorEl(null);
    setScheduleData(initialSchedule);
    dispatch(setIsEdit(false));
    setError(false);
  };

  const handleChange = (
    event: SelectChangeEvent<String> | React.ChangeEvent<HTMLInputElement> | any
  ) => {
    setScheduleData({
      ...scheduleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    handleReset();
  };

  const handleSubmit = () => {
    const { title, description, subject, frequency, repeat, time } =
      scheduleData;

    if (
      title &&
      description &&
      subject &&
      time &&
      ((frequency === "Weekly" && repeat) ||
        (frequency === "Monthly" && repeat) ||
        frequency === "Daily")
    ) {
      if (isEdit) {
        dispatch(
          updateSchedules({
            ...scheduleData,
            repeat: frequency === "Daily" ? "" : scheduleData.repeat,
          })
        )
          .then(unwrapResult)
          .then(() => {
            handleReset();
            setSnack(successUpdateSnack);
          })
          .catch(() => {
            setSnack(errorSnack);
          });
      } else {
        dispatch(
          addSchedules({
            ...scheduleData,
            repeat: frequency === "Daily" ? "" : scheduleData.repeat,
            id: uuidv4(),
          })
        )
          .then(unwrapResult)
          .then(() => {
            handleReset();
            setSnack(successAddSnack);
          })
          .catch(() => {
            setSnack(errorSnack);
          });
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <PreLoader open={loader} />
      <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
        <TextField
          value={searchQuery}
          onChange={handleSearch}
          size="small"
          InputProps={{
            endAdornment: <SearchOutlinedIcon color="primary" />,
          }}
        />

        <Button
          variant="contained"
          startIcon={<ControlPointOutlinedIcon />}
          size="small"
          onClick={handleClick}
        >
          Add
        </Button>
      </Stack>
      <ListView
        rows={filteredRow}
        setFormData={setScheduleData}
        handleOpenMenu={handleClick}
      />

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <FormContainer
          handleChange={handleChange}
          scheduleData={scheduleData}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          error={error}
        />
      </Menu>

      <CustomSnackBar
        open={openSnack}
        message={message}
        severity={severity}
        handleClose={handleCloseSnack}
      />
    </>
  );
}

export default EmailSchedule;
