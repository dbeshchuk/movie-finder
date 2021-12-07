import React from "react";

import { NavLink } from "react-router-dom";

import { AppBar, Tabs, Tab } from "@mui/material";

const styles = {
  container: {
    display: "flex",
    wrap: "nowrap",

    marginBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
  },
  tab: {
    color: "white",
  },
  activeTab: {
    fontWeight: "bold",
    borderTop: "3px solid rgba(0,0,0,0)",
    borderBottom: "3px solid white",
  },
  tabs: {
    variant: "standart",
    color: "green",
  },
};

const Navigation = () => (
  <AppBar position="static" style={styles.container}>
    <Tabs style={{ color: "white" }} value={false}>
      <Tab
        exact
        label="Home"
        to="/"
        component={React.memo(NavLink)}
        style={styles.tab}
        activeStyle={styles.activeTab}
      />

      <Tab
        label="Movies"
        to="/movies"
        component={React.memo(NavLink)}
        style={styles.tab}
        activeStyle={styles.activeTab}
      />
    </Tabs>
  </AppBar>
);

export default Navigation;
