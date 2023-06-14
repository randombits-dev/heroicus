import {hashMessage} from 'viem';
import {useEffect, useState} from 'react';
import {useServerSignature} from './useServerSignature';

export const useLoginToServer = ({token}: { token: number }) => {
  const hash = hashMessage(String(token));
  const [ip, setIp] = useState('');
  const [error, setError] = useState(false);
  const {signMessage, signature, hasSigned} = useServerSignature({token});

  useEffect(() => {
    const savedIp = sessionStorage.getItem('ip.' + hash);
    if (savedIp) {
      setIp(savedIp);
    } else if (hasSigned) {
      fetchIP(signature);
    }
  }, [hasSigned]);

  const fetchIP = (s: string) => {
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
        setIp(data.ip);
        sessionStorage.setItem('ip.' + hash, data.ip);
      }
    }).catch(() => {
      setError(true);
    });
  };

  return {signMessage, ip, error, hasSigned};
};
