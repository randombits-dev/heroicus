import {deployments, ethers, getNamedAccounts} from "hardhat";
import {formatBytes32String} from "ethers/lib/utils";
import {expect} from "chai";
import {fromEther} from "./utils";

describe('GPURental (admin)', (accounts) => {
  it('should allow setting server', async () => {
    const {deployer} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'GPURental']);
    const GPURental = await ethers.getContract('GPURental', deployer);

    await GPURental.setServer(formatBytes32String('large'), fromEther(1), 4);
    await GPURental.setServer(formatBytes32String('small'), fromEther(0.1), 16);

    let {pricePerHour, cpus} = await GPURental.serverConfigs(formatBytes32String('incorrect'));
    expect(pricePerHour).to.equal(0);
    expect(cpus).to.equal(0);

    ({pricePerHour, cpus} = await GPURental.serverConfigs(formatBytes32String('large')));
    expect(pricePerHour).to.equal(fromEther(1));
    expect(cpus).to.equal(4);

    ({pricePerHour, cpus} = await GPURental.serverConfigs(formatBytes32String('small')));
    expect(pricePerHour).to.equal(fromEther(0.1));
    expect(cpus).to.equal(16);

    await GPURental.setServer(formatBytes32String('small'), fromEther(0.2), 8);
    ({pricePerHour, cpus} = await GPURental.serverConfigs(formatBytes32String('small')));
    expect(pricePerHour).to.equal(fromEther(0.2));
    expect(cpus).to.equal(8);

    await GPURental.removeServer(formatBytes32String('small'));
    ({pricePerHour, cpus} = await GPURental.serverConfigs(formatBytes32String('small')));
    expect(pricePerHour).to.equal(0);
    expect(cpus).to.equal(0);
  });
});
