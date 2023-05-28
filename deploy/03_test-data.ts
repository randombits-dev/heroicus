import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {get, execute} = deployments;

  const {user1} = await getNamedAccounts();
  const gpuRental = await get('GPURental');

  await execute('USDC', {from: user1}, 'giveMe', ethers.utils.parseEther('100'));
  await execute('USDC', {from: user1}, 'approve', gpuRental.address, ethers.utils.parseEther('100'));

  helpers;
};
export default func;
func.tags = ['Test'];
