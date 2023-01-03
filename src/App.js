import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Account from "./components/Account";
import Home from "./components/Home";
import { ThemeProvider, CircularProgress, Box } from "@material-ui/core";
import theme from "./theme";
import { auth } from "./firebase";
import { useState, useEffect } from "react";
import LinkRedirect from "./components/LinkRedirect";

const App = () => {
  const [user, setUser] = useState(null);
  const { pathname } = useLocation();
  const [initialLoad, setInitialLoad] = useState(
    pathname === "/" || pathname === "/account" ? true : false
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialLoad(false);
    });
  }, []);

  if (initialLoad)
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/account" /> : <Home />}
        />
        <Route
          path="/account"
          element={user ? <Account /> : <Navigate to="/" />}
        />
        <Route path="/:shortCode" element={<LinkRedirect />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
