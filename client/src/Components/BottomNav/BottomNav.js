import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function BottomNav({ action, setAction }) {
  const style = {
    background: "#fd1079",
    color: "white",
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 80,
    left: "auto",
    position: "fixed",
  };
  return (
    <Box sx={{ width: 400 }}>
      <Fab variant="extended" style={style}>
        <CalendarMonthIcon sx={{ mr: 1 }} />
        Optimize
      </Fab>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={action}
          onChange={(event, newValue) => {
            setAction(newValue);
          }}
        >
          <BottomNavigationAction
            label="Calendar"
            icon={<CalendarMonthIcon />}
          />
          <BottomNavigationAction label="Trips" icon={<ModeOfTravelIcon />} />
          <BottomNavigationAction label="Analytics" icon={<BarChartIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
