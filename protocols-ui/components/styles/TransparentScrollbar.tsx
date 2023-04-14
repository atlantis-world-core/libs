import React from "react";
import { Global } from "@emotion/react";

const TransparentScrollbar = () => (
  <Global
    styles={`
      ::-webkit-scrollbar {
        box-shadow: inset 0 0 20px rgb(0 0 0 / 10%);
        width: 10px;
      }
      ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.1);
      }
    `}
  />
);

export default TransparentScrollbar;
