const reduce = require("lodash/reduce");
const map = require("lodash/map");

const overview = (raw, { categories }) => {
  const categoriesSet = reduce(
    categories,
    (prev, curr) => {
      prev[curr.id] = curr.value;
      return prev;
    },
    {}
  );

  return map(raw.categories, ({ score }, key) => {
    const goalScore = categoriesSet[key];
    return {
      label: key,
      value: Math.round(score * 100),
      goal: goalScore !== "undefined" ? goalScore : 0
    };
  });
};

module.exports = {
  overview
};
