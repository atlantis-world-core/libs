import React from "react";
import { Global } from "@emotion/react";
import CyborgSister from "game/assets/fonts/CyborgSister.ttf";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'CyborgSister';
        font-style: normal;
        font-weight: 700;
        font-display: auto;
        src: url(${CyborgSister});
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      body {
        font-family: 'CyborgSister' !important;
      }
    `}
  />
);

export default Fonts;
