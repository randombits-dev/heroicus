import {useEffect, useState} from 'react';

export const useWaitForServer = (templateId: string, ip: string) => {
  const [ready, setReady] = useState(false);

  const runTest = (interval: any) => {
    fetch(`/api/status?template=${templateId}&ip=${ip}`).then((res) => {
      if (res.status === 200) {
        setReady(true);
        clearInterval(interval);
      }
    }).catch((e) => {
      // not ready
    });
  };

  const retry = () => {
    if (!ip) {
      return;
    }
    const interval: any = setInterval(() => runTest(interval), templateId.startsWith('diffusion') ? 20000 : 5000);
    runTest(interval);
  };

  useEffect(() => {
    retry();
  }, [ip]);

  return {ready, retry};
};
