import { useState, useEffect, useRef } from "react";
import { Navbar } from "react-bootstrap";
import { GoTriangleDown } from "react-icons/go";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  IconButton
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function NavBar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  useEffect(() => {
    checkUser();
  }, []);

  function handleClose() {
    setOpen(false);
  }

  function checkUser() {
    try {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      setUser(currentUser.screen_name);
    } catch (error) {
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        window.location.replace("/login");
      }
    }
  }

  return (
    <Navbar className="yellow">
      <Navbar.Brand href="/home">SUBTweets Inc</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {user !== null ? (
          <Navbar.Text>
            Signed in as: {user}
            <IconButton ref={anchorRef} onClick={() => setOpen(!open)}>
              {" "}
              <GoTriangleDown />
            </IconButton>
          </Navbar.Text>
        ) : (
          <Navbar.Text>Not Signed In</Navbar.Text>
        )}
        <Menu
          open={open}
          handleClose={handleClose}
          anchorRef={anchorRef}
          user={user}
        />
      </Navbar.Collapse>
    </Navbar>
  );
}

function Menu(props) {
  const handleClose = event => {
    if (
      props.anchorRef.current &&
      props.anchorRef.current.contains(event.target)
    ) {
      return;
    }

    props.handleClose();
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      props.handleClose();
    }
  }

  return (
    <div>
      <Popper
        open={props.open}
        anchorEl={props.anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper className="yellow">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={props.open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={() =>
                      window.location.replace(
                        "/users/" +
                          JSON.parse(localStorage.getItem("currentUser")).id
                      )
                    }
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem
                    onClick={() => {
                      localStorage.clear("currentUser");
                      window.location.replace("/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
