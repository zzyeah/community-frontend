export enum RoutePaths {
  Issue = "/issues",
  IssueAdd = "/issueAdd",
  IssueDetail = `${RoutePaths.Issue}/:issueId`,
  IssueTest = `/aaa/:test`,
  Books = "/books",
  Interviews = "/interviews",
  Home = "/",
}
