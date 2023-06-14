import {useEffect, useState} from 'react';

export const useWaitForServer = (url) => {
  const [ready, setReady] = useState(false);

  const runTest = (interval) => {
    fetch(url).then((res) => {
      if (res.status === 200) {
        setReady(true);
        clearInterval(interval);
      }
    }).catch(() => {
      // not ready
    });
  };

  const retry = () => {
    if (!url) {
      return;
    }
    const interval = setInterval(() => runTest(interval), 5000);
    runTest(interval);
  };

  useEffect(() => {
    retry();
  }, [url]);

  return {ready, retry};
};