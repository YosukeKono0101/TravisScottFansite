import React from "react";
import { BeatLoader } from "react-spinners";

// Functional component for the loading spinner
const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <BeatLoader color="white" />
    </div>
  );
};

export default LoadingSpinner;
