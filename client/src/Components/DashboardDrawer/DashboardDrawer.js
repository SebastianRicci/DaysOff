import {
  SwipeableDrawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function DashboardDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false);
  function renderIcon(index) {
    switch (index) {
      case 0:
        return <CalendarMonthIcon />;
      case 1:
        return <ModeOfTravelIcon />;
      case 2:
        return <BarChartIcon />;
    }
  }
  return (
    <>
      <MenuSharpIcon
        color="white"
        onClick={() => setOpenDrawer(true)}
      ></MenuSharpIcon>
      <SwipeableDrawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box role="presentation" sx={{ width: 250 }}>
          <List>
            {["Calendar", "Trips AI", "Stats"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{renderIcon(index)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
