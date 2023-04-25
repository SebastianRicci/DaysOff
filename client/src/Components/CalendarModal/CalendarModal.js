import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WorkIcon from "@mui/icons-material/Work";
import PublicIcon from "@mui/icons-material/Public";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import UndoIcon from "@mui/icons-material/Undo";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "0px",
};

export default function CalendarModal({
  openModal,
  choices,
  setOpenModal,
  selectedDate,
  setChoices,
}) {
  const handleChoice = (choice) => {
    const choiceIndex = choices.findIndex(
      (choice) =>
        moment.utc(new Date(choice.date)).format("YYYY-MM-DD") ===
        moment.utc(new Date(selectedDate)).format("YYYY-MM-DD")
    );

    if (choiceIndex > -1) {
      const updatedChoices = [...choices];
      updatedChoices[choiceIndex] = { date: selectedDate, choice: choice };
      setChoices(updatedChoices);
    } else {
      setChoices([...choices, { date: selectedDate, choice: choice }]);
    }

    setOpenModal(false);
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List>
            <ListItem button onClick={() => handleChoice("mandatory")}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Mark as Mandatory Work Day" />
            </ListItem>
            <ListItem button onClick={() => handleChoice("vacation")}>
              <ListItemIcon>
                <BeachAccessIcon />
              </ListItemIcon>
              <ListItemText primary="Mark as Desired Vacation Day" />
            </ListItem>
            <ListItem button onClick={() => handleChoice("public_holiday")}>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Mark as Public Holiday" />
            </ListItem>
            <ListItem button onClick={() => handleChoice("default")}>
              <ListItemIcon>
                <UndoIcon />
              </ListItemIcon>
              <ListItemText primary="Mark as default Value" />
            </ListItem>
          </List>
        </Box>
      </Modal>
    </div>
  );
}
