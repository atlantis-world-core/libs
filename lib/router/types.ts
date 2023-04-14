// ! Deprecated, to be deleted.
export interface ProtocolRouteParams {
  [key: string]: any;
}

export interface ProtocolRoute {
  path: string;
  title?: string;
  params?: ProtocolRouteParams;
}

export interface ProtocolRouterState {
  current: ProtocolRoute;
  history: ProtocolRoute[];
  routes: {
    /* eslint-disable no-undef */
    [key: string]: JSX.Element | undefined;
  };
}
