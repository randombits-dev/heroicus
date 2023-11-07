import {NextApiRequest, NextApiResponse} from 'next';
import {DescribeInstancesCommand, EC2Client, TerminateInstancesCommand} from '@aws-sdk/client-ec2';
import {withErrorHandler} from '../../errorHandler';
import {getClientToken, readUserInfo} from '../../utils/aws';
import {getRegionId} from '../../utils/templates';

export const runtime = 'edge';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    throw 'Not POST';
  }
  const {token, region} = JSON.parse(req.body);

  const {expired} = await readUserInfo(token);

  if (!expired) {
    throw 'Not expired';
  }

  const ec2 = new EC2Client({region: getRegionId(region)});

  const command = new DescribeInstancesCommand({
    Filters: [{Name: 'client-token', Values: [getClientToken(token)]}]
  });
  const {Reservations} = await ec2.send(command);
  if (Reservations?.length !== 1 || Reservations[0].Instances?.length !== 1) {
    throw 'Server does not exist';
  }
  const Instance = Reservations[0].Instances[0];

  const cmd = new TerminateInstancesCommand({
    InstanceIds: [Instance.InstanceId!]
  });
  await ec2.send(cmd);
  res.json({success: true});
};

export default withErrorHandler(handler);
