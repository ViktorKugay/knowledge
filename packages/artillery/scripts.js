module.exports = {
  interceptor(requestParams, response, context, ee, next) {
    return next(); // MUST be called for the scenario to continue
  },
};
