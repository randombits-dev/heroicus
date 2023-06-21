import {ethers} from 'hardhat';
import {expect, use} from 'chai';
import {ContractFunction} from '@ethersproject/contracts';
import {customMatchers} from './customAssertions';

use(customMatchers);

export const getBlockTime = async () => {
  const blockNum = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNum);
  return block.timestamp;
};

export const fromUSDC = (value: String | Number) => {
  if (typeof value === 'number') {
    value = value.toFixed(6);
  }
  return ethers.utils.parseUnits(String(value), 6);
};

export const assertOwnable = (call: ContractFunction) => {
  return expect(call).to.be.revertedWith('Ownable: caller is not the owner');
};
