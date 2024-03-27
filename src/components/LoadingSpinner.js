import React from "react";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <BeatLoader color="black" />
    </div>
  );
};

export default LoadingSpinner;
