import {NextApiRequest, NextApiResponse} from 'next';

export const withErrorHandler = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.log(error);
    res.status(401).json({error: true});
  }
};
