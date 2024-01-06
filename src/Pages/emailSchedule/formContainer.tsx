import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  frequencyList,
  repeatmonthly,
  repeatweekly,
  timelist,
} from "../../Utils/constants";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../Store";
import { formContainerPropType } from "../../Types/schedules";

const CustomFormContainer = styled(Box)(({ theme }) => ({
  width: "400px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
})) as typeof Box;
const RepeatRadio = styled(Box)(({ theme }) => ({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "30px",
})) as typeof Box;

function FormContainer({
  scheduleData,
  handleChange,
  error,
  handleClose,
  handleSubmit,
}: formContainerPropType) {
  const { isEdit } = useAppSelector((state) => state.emailschedule);

  return (
    <CustomFormContainer>
      <Typography variant="h6">
        {!isEdit ? "Add Schedule" : "Edit Schedule"}
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
          error={error && !scheduleData.title}
          helperText={error && !scheduleData.title && "Please enter Title"}
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
          error={error && !scheduleData.description}
          helperText={
            error && !scheduleData.description && "Please enter Description"
          }
        />
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
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
          error={error && !scheduleData.subject}
          helperText={error && !scheduleData.subject && "Please enter Subject"}
        />
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="subtitle1">Frequency</Typography>

        <FormControl
          sx={{ width: "250px" }}
          size="small"
          error={error && !scheduleData.frequency}
        >
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
          {error && !scheduleData.frequency && (
            <FormHelperText>Please Select Frequency</FormHelperText>
          )}
        </FormControl>
      </Stack>

      {
        {
          Weekly: (
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <>
                <Typography variant="subtitle1">Repeat</Typography>

                <Stack
                  direction="row"
                  width="250px"
                  justifyContent="space-between"
                >
                  {repeatweekly.map((item: any) => (
                    <RepeatRadio
                      bgcolor={
                        scheduleData.repeat === item.id
                          ? "primary.main"
                          : "secondary.main"
                      }
                      color={
                        scheduleData.repeat === item.id
                          ? "#fff"
                          : "primary.main"
                      }
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor:
                            scheduleData.repeat === item.id
                              ? "primary.light"
                              : "secondary.light",
                        },
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "repeat", value: item.id },
                        })
                      }
                    >
                      {item.name}
                    </RepeatRadio>
                  ))}
                </Stack>
              </>
            </Stack>
          ),
          Monthly: (
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <>
                <Typography variant="subtitle1">Repeat</Typography>
                <FormControl
                  size="small"
                  sx={{ width: "250px" }}
                  error={error && !scheduleData.repeat}
                >
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
                  {error && !scheduleData.repeat && (
                    <FormHelperText>Please Select Repeat</FormHelperText>
                  )}
                </FormControl>
              </>
            </Stack>
          ),
          Daily: <></>,
          default: <></>,
        }[scheduleData.frequency]
      }

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="subtitle1">Time</Typography>

        <FormControl
          sx={{ width: "250px" }}
          size="small"
          error={error && !scheduleData.time}
        >
          <Select value={scheduleData.time} onChange={handleChange} name="time">
            {timelist.map((item: string) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          {error && !scheduleData.time && (
            <FormHelperText>Please Select Time</FormHelperText>
          )}
        </FormControl>
      </Stack>

      <Stack direction={"row"} gap={"10px"} justifyContent={"flex-end"} mt={1}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ color: "primary.main" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {!isEdit ? "Done" : "Update"}
        </Button>
      </Stack>
    </CustomFormContainer>
  );
}

export default FormContainer;
