
export class PathUtils {
    protected pathValue = "";
  
    constructor(paths?: string[]) {
      if (!paths) return;
      this.mergePath(paths);
    }
    public mergePath(paths: string[]) {
      if (paths.length === 0) {
        return "";
      }
      if (!paths[0].startsWith("/")) {
        throw new Error("first path must be first level route path");
      }
      paths = paths.map((path, index, arr) => {
        if (path === "") return path;
        if (index === 0 && !path.startsWith("/")) {
          path = "/" + path;
        }
        if (path.endsWith("/")) {
          path = path.slice(0, -1);
        }
        return path;
      });
      this.pathValue = paths.join("");
      return this;
    }
  
    public replacePath(params: string[], path?: string) {
      if (!path) {
        path = this.pathValue;
      }
      const reg = /(:[\w\d]*)/g;
      const matchs = path.match(reg);
      if (!matchs) return this;
      this.pathValue = path.replace(reg, (...args) => {
        const pathMatch = args[0];
        const index = matchs.findIndex((match) => match === pathMatch);
        return params[index];
      });
      return this;
    }
  
    public getPath() {
      return this.pathValue;
    }
  }
  