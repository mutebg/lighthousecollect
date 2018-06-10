const overview = (raw, { categories }) => {
  const categoriesSet = categories.reduce((prev, curr) => {
    prev[curr.name] = curr.value;
    return prev;
  }, {});
  return raw.reportCategories.map(({ name, score }) => {
    const goalScore = categoriesSet[name];
    return {
      label: name,
      value: Math.round(score),
      goal: goalScore !== "undefined" ? goalScore : 0
    };
  });
};

module.exports = {
  overview
};
