import React from "react";
import { Button, Typography, Box, AppBar, Toolbar } from "@material-ui/core";
import { auth } from "../../firebase";

const Navbar = () => {
  return (
    <AppBar elevation={0} position="static" color="secondary" >
      <Toolbar>
        <Typography variant="h6">Shortit</Typography>
        <Box ml="auto">
          <Button color="inherit">Links</Button>
          <Button onClick={() => auth.signOut()} color="inherit">Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
