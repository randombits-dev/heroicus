import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {formatBytes32String} from 'ethers/lib/utils';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, get, execute} = deployments;

  const {deployer, dev} = await getNamedAccounts();
  const usdc = await get('USDC');

  await deploy('GPURental', {
    contract: 'GPURental',
    from: deployer,
    args: [usdc.address, dev],
    log: true,
  });

  await execute('GPURental', {from: deployer}, 'setTemplate', formatBytes32String('template1'), ethers.utils.parseEther('1'), 2);
  await execute('GPURental', {from: deployer}, 'setTemplate', formatBytes32String('template2'), ethers.utils.parseEther('2'), 1);
  await execute('GPURental', {from: deployer}, 'setTemplate', formatBytes32String('tiny'), ethers.utils.parseEther('0.1'), 10);
};
export default func;
func.tags = ['GPURental'];
