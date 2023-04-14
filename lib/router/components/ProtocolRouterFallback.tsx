import React from "react";

export interface ProtocolRouterFallbackProps {
  children?: React.ReactNode;
}

const ProtocolRouterFallback = ({ children }: ProtocolRouterFallbackProps) => (
  <>{children || <>Not Found</>}</>
);

export default ProtocolRouterFallback;
