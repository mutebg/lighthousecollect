const overview = raw =>
  raw.reportCategories.map(({ name, score }) => ({
    label: name,
    value: Math.round(score)
  }));

module.exports = {
  overview
};
