import { useEffect, useMemo } from "react";
import { BoxProps } from "@chakra-ui/react";
import { StateWithValue } from "@atlantis-world/react-ridge-state";
import { ProtocolRouterState } from "../types";
import { useLogger } from "../../core";
import useProtocolRouter from "../hooks/useProtocolRouter";
import ProtocolRouterContainer from "./ProtocolRouterContainer";
import Fallback from "./ProtocolRouterFallback";

export interface ProtocolRouterProps extends BoxProps {
  state: StateWithValue<ProtocolRouterState>;
  logVerbose?: boolean;
  // eslint-disable-next-line no-undef
  fallback?: JSX.Element;
}

const ProtocolRouter = ({
  state,
  logVerbose,
  fallback,
  ...props
}: ProtocolRouterProps) => {
  const log = useLogger(ProtocolRouter.name);
  const [{ active }] = useProtocolRouter(state);
  const routes = useMemo(() => state.get().routes, [state, active]);

  useEffect(() => {
    if (logVerbose) {
      log?.verbose("active", active);
    }
  }, [active]);

  return (
    <ProtocolRouterContainer {...props}>
      {routes[active.path] || <Fallback>{fallback}</Fallback>}
    </ProtocolRouterContainer>
  );
};

export default ProtocolRouter;
