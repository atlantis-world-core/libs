import React from "react";
import CoreContext from "../context";
import { CoreContextState } from "../types";

export interface CoreProviderProps {
  defaultValue: CoreContextState;
  children?: React.ReactNode;
}

const CoreProvider = ({ defaultValue, children }: CoreProviderProps) => (
  <CoreContext.Provider value={defaultValue}>{children}</CoreContext.Provider>
);

export default CoreProvider;
