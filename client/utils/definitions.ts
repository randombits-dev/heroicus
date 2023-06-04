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
  template: string;
  user: Address;
  expires: number;
}

export type ContractWriteStatus = undefined | 'loading' | 'pending' | 'success' | 'error';
