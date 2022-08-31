import React from "react";
import axios from "axios";
import { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);

  return <div>LandingPage 안녕하세요 제발나와라요</div>;
}

export default LandingPage;
