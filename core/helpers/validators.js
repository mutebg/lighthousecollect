const objectKeyValidator = (rules, metatags) => {
  const missing = [];
  rules.forEach(rule => {
    if (!metatags[rule]) {
      missing.push(rule);
    }
  });
  return missing;
};

module.exports = { objectKeyValidator };
