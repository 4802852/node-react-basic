import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";

function NavBar() {
  return (
    <div style={{ position: "fixed", width: "100%", zIndex: 1, display: "flex" }}>
      <div className="logo" style={{ width: "80px" }}>
        Logo
      </div>
      <div style={{ width: "100%" }}>
        <LeftMenu />
      </div>
      <div style={{ width: "300px" }}>
        <RightMenu />
      </div>
    </div>
  );
}

export default NavBar;
