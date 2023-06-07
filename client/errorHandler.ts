export const withErrorHandler = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.log(error);
    res.status(401).json({error: true});
  }
};
