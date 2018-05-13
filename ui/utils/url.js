export const getFIlter = props =>
  ["project", "task", "uri", "dateFrom", "dateTo"].reduce((prev, next) => {
    if (props[next]) {
      prev[next] = props[next];
    }
    return prev;
  }, {});
