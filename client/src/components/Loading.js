import React from "react";
import { Spinner } from "react-bootstrap";
const Loading = () => {
  return (
    <div
      className="loading-container"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <span class="visually-hidden">Loading...</span> */}
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loading;
