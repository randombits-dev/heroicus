import {Address} from 'wagmi';

export interface TemplateInfo {
  name: string;
  serverId: string;
  price: bigint;
  cpus: number;
}

export interface ServerInfo {
  id: string;
  price: bigint;
  cpus: number;
}

export interface UserInfo {
  token: number;
  user: Address;
  expires: number;
  expired: boolean;
  templateId: string;
  region: number;

  // address user;
  // uint64 expires;
  // bytes32 templateId;
  // bytes32 serverId;
  // uint8 region;
  // uint32 diskSize;
  // uint256 payment;
}

export type ContractWriteStatus = undefined | 'loading' | 'pending' | 'success' | 'error';
