import {NextApiRequest, NextApiResponse} from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ip = req.query?.ip || '';
  const templateId = req.query?.template || '';
  const ready = await checkTemplate(templateId as string, ip as string);
  if (ready) {
    res.status(200).end();
  } else {
    res.status(500).end();
  }
};

const checkTemplate = async (templateId: string, ip: string) => {
  if (templateId.indexOf('diffusion.') == 0) {
    return checkStatus(`http://${ip}:7860/sdapi/v1/progress`);
  } else if (templateId.indexOf('docker.') === 0) {
    return checkStatus(`http://${ip}:9000/api/system/status`);
  } else {
    return false;
  }
};

const checkStatus = async (url: string) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(url, {signal: controller.signal});
    if (res.status === 200) {
      return true;
    }
  } finally {
    clearTimeout(id);
  }
  return false;
};

export default handler;
