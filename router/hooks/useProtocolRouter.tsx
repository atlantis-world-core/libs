import { useMemo } from "react";
import { StateWithValue } from "@atlantis-world/react-ridge-state";
import {
  ProtocolRoute,
  ProtocolRouteParams,
  ProtocolRouterState,
} from "../types";

export interface UseProtocolRouterHookOptions<T extends ProtocolRouterState> {
  state: StateWithValue<T>;
}

export default function useProtocolRouter(
  routerState: StateWithValue<ProtocolRouterState>,
) {
  const [state, setState] = routerState.use();
  const active = useMemo<ProtocolRoute>(() => state.current, [state]);
  const params = useMemo<ProtocolRouteParams | undefined>(
    () => state.current.params,
    [state.current.params],
  );
  const history = useMemo<ProtocolRoute[]>(
    () => state.history,
    [state.history],
  );

  const navigate = (next: ProtocolRoute) => {
    const prev = state.current;
    setState({
      ...state,
      current: next,
      history: [...state.history, prev],
    });
  };

  const back = () => {
    const prev = [...state.history].pop();
    setState({
      ...state,
      current: {
        ...state.current,
        ...prev,
      },
      history: state.history.filter((route) => route.path !== prev?.path),
    });
  };

  return [
    { active, params, history },
    { navigate, back },
  ] as const;
}
