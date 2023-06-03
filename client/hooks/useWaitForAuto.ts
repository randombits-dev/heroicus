import {useEffect, useState} from 'react';

export const useWaitForAuto = (url) => {
  const [ready, setReady] = useState(false);

  const runTest = (interval) => {
    fetch(`${url}/sdapi/v1/progress`).then((res) => {
      if (res.status === 200) {
        setReady(true);
        clearInterval(interval);
      }

    }).catch(() => {
      // not ready
    });
  };

  useEffect(() => {
    if (!url) {
      return;
    }
    const interval = setInterval(() => runTest(interval), 5000);
    runTest(interval);
  }, [url]);

  return {ready};
};
