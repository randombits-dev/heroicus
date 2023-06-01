import {useEffect, useState} from 'react';

export const useWaitForAuto = (url) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!url) {
      return;
    }
    const interval = setInterval(() => {
      fetch(`${url}/sdapi/v1/progress`).then((res) => {
        if (res.status === 200) {
          setReady(true);
          clearInterval(interval);
        }

      }).catch(() => {
        // not ready
      });
    }, 5000);
  }, [url]);

  return {ready};
};
