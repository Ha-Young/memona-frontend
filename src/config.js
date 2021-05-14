const merge = require("lodash/merge");

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    isDev: process.env.NODE_ENV !== "production",
    basename: process.env.PUBLIC_PATH,
    isBrowser: typeof window !== "undefined",
    resizeThrottleWaitTime: 300,
    gqlAPIUrl: process.env.REACT_APP_GRAPHQL_API_URI,
    tokenKey: "authorization",
    authPrefix: "Bearer",
  },
  test: {},
  development: {},
  production: {},
};

module.exports = merge(config.all, config[config.all.env]);
