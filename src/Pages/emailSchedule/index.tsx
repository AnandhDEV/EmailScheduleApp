import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import ListView from "./listView";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { useAppDispatch, useAppSelector } from "../../Store";
import { fetchSchedules } from "../../Store/emailSchedule";
import { scheduleType } from "../../Types/schedules";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import { frequencyList, repeatmonthly, timelist } from "../../Utils/constants";

const FormContainer = styled(Box)(({ theme }) => ({
  width: "400px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
}));

const initialSchedule = {
  id: 0,
  title: "",
  description: "",
  subject: "",
  frequency: "",
  repeat: "",
  time: "",
};

function EmailSchedule() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSchedules());
  }, []);

  const { scheduleList, isEdit } = useAppSelector(
    (state) => state.emailschedule
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [scheduleData, setScheduleData] = useState(initialSchedule);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleReset = () => {
    setScheduleData(initialSchedule);
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
  };

  const handleSubmit = () => {
    let error = false;
  };

  return (
    <>
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
        onClose={handleClose}
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
        <FormContainer>
          <Typography variant="h6">
            {isEdit ? "Add Schedule" : "Edit Schedule"}
          </Typography>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="subtitle1">Title</Typography>
            <TextField
              name="title"
              sx={{
                width: "250px",
              }}
              value={scheduleData.title}
              onChange={handleChange}
              size="small"
            />
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}

            // gap={10}
          >
            <Typography variant="subtitle1">Description</Typography>
            <TextField
              name="description"
              multiline
              rows={2}
              sx={{
                width: "250px",
              }}
              value={scheduleData.description}
              onChange={handleChange}
              size="small"
            />
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            // gap={10}
          >
            <Typography variant="subtitle1">Subject</Typography>
            <TextField
              name="subject"
              sx={{
                width: "250px",
              }}
              value={scheduleData.subject}
              onChange={handleChange}
              size="small"
            />
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="subtitle1">Frequency</Typography>

            <FormControl sx={{ width: "250px" }} size="small">
              <Select
                value={scheduleData.frequency}
                onChange={handleChange}
                name="frequency"
              >
                {frequencyList.map((item: string) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="subtitle1">Repeat</Typography>

            <FormControl size="small" sx={{ width: "250px" }}>
              <Select
                value={scheduleData.repeat}
                onChange={handleChange}
                name="repeat"
              >
                {repeatmonthly.map((item: string) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="subtitle1">Time</Typography>

            <FormControl sx={{ width: "250px" }} size="small">
              <Select value={""} onChange={handleChange} name="time">
                {timelist.map((item: string) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction={"row"}
            gap={"10px"}
            justifyContent={"flex-end"}
            mt={1}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ color: "primary.main" }}
            >
              Cancel
            </Button>
            <Button variant="contained">{isEdit ? "Done" : "Update"}</Button>
          </Stack>
        </FormContainer>
      </Menu>
    </>
  );
}

export default EmailSchedule;
