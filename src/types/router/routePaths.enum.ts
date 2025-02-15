export enum RoutePaths {
  Issue = "/issues",
  IssueAdd = "/issueAdd",
  IssueDetail = `${RoutePaths.Issue}/:issueId`,
  Books = "/books",
  Interviews = "/interviews",
  SearchPage = "/searchPage",
  Personal = "/personal",
  Home = "/",
}
