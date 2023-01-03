import React from "react";
import { Typography, Button, Box, Grid, Hidden } from "@material-ui/core";
import { useState } from "react";
import AuthModal from "./AuthModal";

const Home = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={4}
      boxSizing="border-box"
      height="100vh"
      bgcolor="#56B7BA"
      color="#fff"
    >
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Shortit</Typography>
        <Button onClick={() => setOpenAuthModal(true)} color="inherit">
          Login/Signup
        </Button>
      </Box>

      <Box display="flex" flexGrow={1} alignItems="center">
        <Grid container alignItems="center">
          <Grid item sm={6}>
            <Box>
              <Typography variant="h3"> The Big Short </Typography>
              <Box my={2}>
                <Typography>
                  One stop destination to short your links{" "}
                </Typography>
              </Box>
              <Button
                onClick={() => setOpenAuthModal(true)}
                variant="contained"
                disableElevation
                style={{ color: "#56B7BA" }}
                size="large"
              >
                Get Started
              </Button>
            </Box>
          </Grid>
          <Hidden only="xs">
            <Grid item sm={6}>
              <img
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
                }}
                src="/assets/imgshortit.jpg"
                alt="Theme Img"
              />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
