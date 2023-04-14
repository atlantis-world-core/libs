import { createContext } from "react";
import { CoreContextState } from "../types";

const CoreContext = createContext<CoreContextState>({
  accessToken: "",
  alchemyApiPolygonMainnetUrl: "",
  apiBaseUrl: "",
  moralisWeb3ApiKey: "",
});

export default CoreContext;
