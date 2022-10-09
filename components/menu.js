import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import axios from "axios";

function Menu({
  menuopen,
  setMenuopen,
  anchorRef,
  handleDelete,
  id,
  setDialogOpen,
  row,
  setCurrentitem,
  refreshData,
}) {
  const handleClose = () => {
    setMenuopen(false);
  };
  const handledelete = () => {
    setMenuopen(false);
    handleDelete(id);
  };
  const handleedit = () => {
    setCurrentitem(row);
    setDialogOpen(true);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setMenuopen(false);
    } else if (event.key === "Escape") {
      setMenuopen(false);
    }
  }

  return (
    <Popper
      open={menuopen}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps}>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={menuopen}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem onClick={handledelete}>Delete</MenuItem>
                <MenuItem onClick={handleedit}>Edit</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}

export default Menu;
