import { Box, Stack } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { layoutProps } from "../Types/layout";

const SideBar = styled(Box)(({ theme }) => ({
  width: "5%",
  height: "106vh",
  backgroundColor: theme.palette.primary.main,
  position: "absolute",
  top: 0,
  zIndex: 20,
})) as typeof Box;

const ContentContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  padding: "20px",
  paddingRight: "50px",
  marginLeft: "5%",
})) as typeof Box;

const TopBar = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "6vh",
  backgroundColor: theme.palette.secondary.main,
})) as typeof Box;

function Layout({ children }: layoutProps) {
  return (
    <>
      <TopBar></TopBar>
      <Stack direction={"row"} height={"100vh"}>
        <SideBar></SideBar>
        <ContentContainer>{children}</ContentContainer>
      </Stack>
    </>
  );
}

export default Layout;
