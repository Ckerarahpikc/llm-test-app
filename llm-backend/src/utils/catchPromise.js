module.exports = (callback) => {
  return (req, res, next) => {
    // we asume callback is a promise, therefor .catch will handle the incoming errors, this whole thing will get rid of using 'try...catch...finally' in async functions, we just need to cover whole function inside this 'catch'
    callback(req, res, next).catch(next);
  };
};
