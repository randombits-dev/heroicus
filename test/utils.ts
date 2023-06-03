import {ethers} from 'hardhat';
import {expect, use} from 'chai';
import {BigNumberish} from 'ethers';
import {ContractFunction} from '@ethersproject/contracts';
import {customMatchers} from './customAssertions';

use(customMatchers);

export const getBlockTime = async () => {
  const blockNum = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNum);
  return block.timestamp;
};

export const fromEther = (value: String | Number) => {
  return ethers.utils.parseEther(String(value));
};

export const toEther = (value: BigNumberish) => {
  return ethers.utils.formatEther(value);
};

export const assertOwnable = (call: ContractFunction) => {
  return expect(call).to.be.revertedWith('Ownable: caller is not the owner');
};
