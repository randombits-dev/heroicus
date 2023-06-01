import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {deployments, getNamedAccounts} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployer} = await getNamedAccounts();

  await deployments.deploy('USDC', {
    contract: 'TestToken',
    from: deployer,
    args: ['USDC', 'USDC'],
    log: true,
  });

};
export default func;
func.tags = ['USDC'];
