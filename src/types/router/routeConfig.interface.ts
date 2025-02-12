import { RoutePaths } from "./routePaths.enum";

export interface RouteBeforeConfig {
  path: RoutePaths;
  needLogin: boolean;
}
