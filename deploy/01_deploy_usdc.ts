import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer, user1} = await getNamedAccounts();

  await deploy('USDC', {
    contract: 'TestToken',
    from: deployer,
    args: ['USDC', 'USDC'],
    log: true,
  });
};
export default func;
func.tags = ['USDC'];