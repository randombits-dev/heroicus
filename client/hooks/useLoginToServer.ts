import {useSignMessage} from 'wagmi';
import {hashMessage} from 'viem';
import {useEffect, useState} from 'react';

export const useLoginToServer = ({token}) => {
  const hash = hashMessage(token);
  const [autoUrl, setAutoUrl] = useState('');
  const [error, setError] = useState(false);

  const {signMessage} = useSignMessage({
    message: 'Sign in with ID: ' + hash,
    onSuccess: (data) => {
      sessionStorage.setItem('s.' + hash, data);
      fetchIP(data);
    }
  });

  useEffect(() => {
    const savedSignature = sessionStorage.getItem('s.' + hash);
    if (savedSignature) {
      fetchIP(savedSignature);
    }
  }, []);

  const fetchIP = (s) => {
    fetch(`/api/open`, {
      method: 'POST',
      body: JSON.stringify({
        token,
        s
      })
    }).then(res => res.json()).then(data => {
      if (data.error) {
        setError(true);
      } else if (data.ip) {
        setAutoUrl(data.ip);
      }
    }).catch(() => {
      setError(true);
    });
  };

  return {signMessage, url: autoUrl, error};
};
