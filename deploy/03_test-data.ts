import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';
import {formatBytes32String} from 'ethers/lib/utils';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {execute} = deployments;

  const {deployer, user1} = await getNamedAccounts();

  await execute('USDC', {from: user1}, 'giveMe', ethers.utils.parseUnits('100', 6));

  await execute('Heroicus', {from: deployer}, 'setLimits', 1, 2, 4);
  await execute('Heroicus', {from: deployer}, 'setLimits', 2, 2, 4);

  await execute('Heroicus', {from: deployer}, 'setServer', formatBytes32String('g4dn.xlarge'), 4);
  await execute('Heroicus', {from: deployer}, 'setServer', formatBytes32String('t2.medium'), 2);

  await execute('Heroicus', {from: deployer}, 'setTemplate', formatBytes32String('diffusion.xlarge'), formatBytes32String('g4dn.xlarge'),
    ethers.utils.parseUnits('1', 6));
  await execute('Heroicus', {from: deployer}, 'setTemplate', formatBytes32String('docker.medium'), formatBytes32String('t2.medium'),
    ethers.utils.parseUnits('0.1', 6));
};
export default func;
func.tags = ['Test'];
