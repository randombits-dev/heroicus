import {Address} from 'wagmi';

export const TEMPLATE_LIST = ['template1', 'template2', 'tiny'];

export interface TemplateInfo {
  name: string;
  price: number;
  max: number;
}

export interface UserInfo {
  template: string;
  user: Address;
  expires: number;
}
