import {NextApiRequest, NextApiResponse} from 'next';
import {DescribeInstancesCommand, EC2Client} from '@aws-sdk/client-ec2';
import {hashMessage, verifyMessage} from 'viem';
import {withErrorHandler} from '../../errorHandler';
import {getClientToken, readUserInfo} from '../../utils/aws';
import {getRegionId} from '../../utils/templates';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    throw 'Not POST';
  }
  const {token, s} = JSON.parse(req.body);
  const hash = hashMessage(String(token));

  const {expired, user, region} = await readUserInfo(token);
  const signatureValid = await verifyMessage({
    address: user,
    message: 'Sign in with ID: ' + hash,
    signature: s
  });
  if (!signatureValid) {
    throw 'Not owner';
  }

  if (expired) {
    throw 'Expired rental';
  }

  const ec2 = new EC2Client({region: getRegionId(region)});
  const command = new DescribeInstancesCommand({
    Filters: [{Name: 'client-token', Values: [getClientToken(token)]}]
  });
  const {Reservations} = await ec2.send(command);
  if (Reservations?.length !== 1 || Reservations[0].Instances?.length !== 1) {
    throw 'Instance not found: ' + token;
  }
  const ip = Reservations[0].Instances[0].PublicIpAddress;
  res.json({ip});
};

export default withErrorHandler(handler);
