import React from "react";
import { Global } from "@emotion/react";

const FocusInvisibility = () => (
  <Global
    styles={`
      *:focus {
        outline: none !important;
        box-shadow: none !important;
      }
    `}
  />
);

export default FocusInvisibility;
