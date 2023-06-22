import {useEffect, useState} from 'react';

let interval: any;
export const useWaitForServer = (templateId: string, ip: string) => {
  const [ready, setReady] = useState(false);

  const runTest = () => {
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
    interval = setInterval(() => runTest(), templateId.startsWith('diffusion') ? 20000 : 5000);
    runTest();
  };

  useEffect(() => {
    retry();
    return () => {
      clearInterval(interval);
    };
  }, [ip]);

  return {ready, retry};
};
