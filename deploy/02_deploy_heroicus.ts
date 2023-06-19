import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, get, execute} = deployments;

  const {deployer, dev} = await getNamedAccounts();
  const usdc = await get('USDC');

  await deploy('Heroicus', {
    contract: 'Heroicus',
    from: deployer,
    args: [usdc.address],
    log: true,
  });

  await execute('Heroicus', {from: deployer}, 'changeDevAddress', dev);
};
export default func;
func.tags = ['Heroicus'];
