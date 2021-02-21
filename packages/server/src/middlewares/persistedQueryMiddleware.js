const persistedQueryMiddleware = queryMaps => (req, _res, next) => {
  const { queryId } = req.body;
  console.log(queryId);

  const query = queryMaps[queryId];
  console.log(query);

  req.body.query = query;

  next();
};

export default persistedQueryMiddleware;
