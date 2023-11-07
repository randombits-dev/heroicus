import {NextApiRequest, NextApiResponse} from 'next';
import {withErrorHandler} from '../../errorHandler';
import {readUserInfo, startServer} from '../../utils/aws';

export const runtime = 'edge';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    throw 'Not POST';
  }
  const {token} = JSON.parse(req.body);

  const {expired, templateId, region} = await readUserInfo(token);

  if (expired) {
    throw 'Expired Rental';
  }

  const result = await startServer(templateId, token, region);
  res.json(result);
};

export default withErrorHandler(handler);
