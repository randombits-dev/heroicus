import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';
import {formatBytes32String} from 'ethers/lib/utils';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {execute} = deployments;

  const {deployer, user1} = await getNamedAccounts();

  await execute('USDC', {from: user1}, 'giveMe', ethers.utils.parseEther('100'));
  // await execute('USDC', {from: user1}, 'approve', gpuRental.address, ethers.utils.parseEther('100'));

  await execute('Heroicus', {from: deployer}, 'setTLimit', 1, 2);
  await execute('Heroicus', {from: deployer}, 'setGLimit', 1, 4);

  await execute('Heroicus', {from: deployer}, 'setServer', formatBytes32String('g4dn.xlarge'), ethers.utils.parseEther('1'), 4);
  await execute('Heroicus', {from: deployer}, 'setServer', formatBytes32String('t2.micro'), ethers.utils.parseEther('0.1'), 1);

  await execute('Heroicus', {from: deployer}, 'setTemplate', formatBytes32String('diffusion1'), formatBytes32String('g4dn.xlarge'),
    ethers.utils.parseEther('1'));
  await execute('Heroicus', {from: deployer}, 'setTemplate', formatBytes32String('tiny'), formatBytes32String('t2.micro'),
    ethers.utils.parseEther('0.1'));
};
export default func;
func.tags = ['Test'];
