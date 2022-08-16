import React from "react";
import loading from "./loading.gif";

const Loading = () => (
  <>
    <img src={loading} style={{ width: "200px", margin: "auto", display: "block" }} alt="Loading..."></img>
  </>
);

export default Loading;