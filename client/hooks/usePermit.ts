import {Address, useAccount, useContractRead, useSignTypedData} from 'wagmi';
import {testTokenABI} from '../generated';
import {parseEther} from 'viem';
import {USDCAddress} from '../utils/addresses';

export const usePermit = (coin: Address, spender: Address, amount: string) => {
  const {address} = useAccount();

  const {data: nonces} = useContractRead({
    address: coin,
    abi: testTokenABI,
    functionName: 'nonces',
    args: [spender]
  });

  const deadline = Math.floor(Date.now() / 1000) + 4200;

  const values = {
    owner: address,
    spender: spender,
    value: parseEther(amount),
    nonce: nonces,
    deadline: deadline,
  };

  const domain = {
    name: 'USDC',
    version: '1',
    chainId: 31337,
    verifyingContract: USDCAddress
  };

  const types = {
    Permit: [{
      name: 'owner',
      type: 'address'
    },
      {
        name: 'spender',
        type: 'address'
      },
      {
        name: 'value',
        type: 'uint256'
      },
      {
        name: 'nonce',
        type: 'uint256'
      },
      {
        name: 'deadline',
        type: 'uint256'
      },
    ],
  };

  const {signTypedData} = useSignTypedData({domain, types, message: values, primaryType: 'Permit'});
  return {sign: signTypedData};
};
