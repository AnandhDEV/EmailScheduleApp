import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { scheduleTableProptype, scheduleType } from "../../Types/schedules";

const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
}));

const CustomTableHead = styled(TableHead)(({ theme }) => ({
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 0px",
  backgroundColor: theme.palette.secondary.main,
  height: "10px",
}));
const CustomTableCell = styled(TableCell)(({ theme }) => ({
  padding: "8px 16px 8px 16px",
}));

export default function ListView({
  rows,
  setFormData,
  handleOpenMenu,
}: scheduleTableProptype) {
  const handleEdit = (e: React.MouseEvent<HTMLElement>, row: scheduleType) => {
    handleOpenMenu(e);
    setFormData(row);
  };

  return (
    <CustomTableContainer>
      <Table sx={{ minWidth: 650 }}>
        <CustomTableHead>
          <TableRow>
            <CustomTableCell width={"15%"}>Title</CustomTableCell>
            <CustomTableCell width={"35%"}>Description</CustomTableCell>
            <CustomTableCell width={"15%"}>Subject</CustomTableCell>
            <CustomTableCell width={"15%"}>Schedule</CustomTableCell>
            <CustomTableCell width={"20%"}>Actions</CustomTableCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {rows?.map((row: scheduleType) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.frequency}</TableCell>
              <TableCell>{row.repeat || "N/A"}</TableCell>
              <TableCell>
                <>
                  <IconButton onClick={(e) => handleEdit(e, row)}>
                    <EditSharpIcon color="primary" fontSize="small" />
                  </IconButton>
                  <IconButton>
                    <DeleteOutlineSharpIcon color="primary" fontSize="small" />
                  </IconButton>
                </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
}
