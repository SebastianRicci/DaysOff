import { Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Clipboard({ overview }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(overview.join("\n\n"));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Button onClick={handleClick}>
        <ContentPasteIcon color="secondary" />
      </Button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
}
