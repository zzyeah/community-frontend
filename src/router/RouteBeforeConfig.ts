import { RouteBeforeConfig } from "@/types/router/routeConfig.interface";
import { RoutePaths } from "@/types/router/routePaths.enum";

const routeBeforeConfig: RouteBeforeConfig[] = [
  {
    path: RoutePaths.Issue,
    needLogin: false,
  },
  {
    path: RoutePaths.IssueAdd,
    needLogin: true,
  },
  {
    path: RoutePaths.IssueDetail,
    needLogin: false,
  },
  {
    path: RoutePaths.Books,
    needLogin: false,
  },
  {
    path: RoutePaths.Interviews,
    needLogin: false,
  },
  {
    path: RoutePaths.searchPage,
    needLogin: false,
  },
  { path: RoutePaths.Personal, needLogin: true },
  {
    path: RoutePaths.Home,
    needLogin: false,
  },
];
export default routeBeforeConfig;
