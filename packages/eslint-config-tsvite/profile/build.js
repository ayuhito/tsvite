const shared = require("./shared");

const buildRules = (profile, isESM) => {
  const rules = profile;
  for (const override of profile.overrides) {
    Object.assign(override.rules, shared);
    // If ESM is enabled
    Object.assign(
      override.rules,
      isESM
        ? { "unicorn/prefer-module": "error" }
        : { "unicorn/prefer-module": "off" }
    );
  }

  return rules;
};

module.exports = buildRules;
