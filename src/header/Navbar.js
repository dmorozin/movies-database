import React from "react";
import { Link, withRouter } from "react-router-dom";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">Movies Database</Link>
      </div>
      <div className="search-bar">
        <Search />
      </div>
      <div style={{ clear: "both" }} />
    </nav>
  );
};

export default withRouter(Navbar);
