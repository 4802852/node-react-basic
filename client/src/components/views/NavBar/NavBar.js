import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";

function NavBar() {
  return (
    <div style={{ position: "fixed", width: "100%", zIndex: 1, display: "flex" }}>
      <div className="logo" style={{ width: "10%", height: "60px", minWidth: "80px", display: "table" }}>
        <div style={{ display: "table-cell", textAlign: "center", verticalAlign: "middle" }}>
          <h2>Logo</h2>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <LeftMenu />
      </div>
      <div style={{ width: "30%" }}>
        <RightMenu />
      </div>
    </div>
  );
}

export default NavBar;
