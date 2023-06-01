export const withErrorHandler = (handler) => async (req, res) => {
  try {
    return handler(req, res);
  } catch (error) {
    console.log(error);
    return res.status(401).json({error: true});
  }
};
