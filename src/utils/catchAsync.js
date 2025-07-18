const catchAsync = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};

export default catchAsync;
