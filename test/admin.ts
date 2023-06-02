import {deployments, ethers, getNamedAccounts} from 'hardhat';
import {formatBytes32String} from 'ethers/lib/utils';
import {expect} from 'chai';
import {assertOwnable, fromEther} from './utils';

describe('GPURental (admin)', () => {
  it('should allow setting server', async () => {
    const {deployer} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'GPURental']);
    const GPURental = await ethers.getContract('GPURental', deployer);

    await GPURental.setServer(formatBytes32String('g4dn.xlarge'), fromEther(1), 4);
    await GPURental.setServer(formatBytes32String('t2.small'), fromEther(0.1), 16);

    let {pricePerHour, cpus} = await GPURental.serverConfigs(formatBytes32String('incorrect'));
    expect(pricePerHour).to.equal(0);
    expect(cpus).to.equal(0);

    ({pricePerHour, cpus} = await GPURental.serverConfigs(formatBytes32String('g4dn.xlarge')));
    expect(pricePerHour).to.equal(fromEther(1));
    expect(cpus).to.equal(4);

    ({pricePerHour, cpus} = await GPURental.serverConfigs(formatBytes32String('t2.small')));
    expect(pricePerHour).to.equal(fromEther(0.1));
    expect(cpus).to.equal(16);

    await GPURental.setServer(formatBytes32String('t2.small'), fromEther(0.2), 8);
    ({pricePerHour, cpus} = await GPURental.serverConfigs(formatBytes32String('t2.small')));
    expect(pricePerHour).to.equal(fromEther(0.2));
    expect(cpus).to.equal(8);

    await GPURental.removeServer(formatBytes32String('t2.small'));
    ({pricePerHour, cpus} = await GPURental.serverConfigs(formatBytes32String('t2.small')));
    expect(pricePerHour).to.equal(0);
    expect(cpus).to.equal(0);
  });

  it('should fail setting server if not g or t', async () => {
    const {deployer} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'GPURental']);
    const GPURental = await ethers.getContract('GPURental', deployer);

    await expect(GPURental.setServer(formatBytes32String('small'), fromEther(0.1), 16)).to.be
      .revertedWith('GPU: Only g or t servers are allowed');
  });

  it('should allow setting template', async () => {
    const {deployer} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'GPURental']);
    const GPURental = await ethers.getContract('GPURental', deployer);

    await GPURental.setServer(formatBytes32String('g4dn.xlarge'), fromEther(1), 4);
    await GPURental.setServer(formatBytes32String('t2.small'), fromEther(0.1), 16);
    await GPURental.setTemplate(formatBytes32String('template1'), formatBytes32String('g4dn.xlarge'), fromEther(1));
    await GPURental.setTemplate(formatBytes32String('template2'), formatBytes32String('g4dn.xlarge'), fromEther(2));
    await GPURental.setTemplate(formatBytes32String('template3'), formatBytes32String('t2.small'), fromEther(3));

    let {pricePerHour, serverId} = await GPURental.templateInfo(formatBytes32String('incorrect'));
    expect(pricePerHour).to.equal(0);

    ({pricePerHour, serverId} = await GPURental.templateInfo(formatBytes32String('template1')));
    expect(pricePerHour).to.equal(fromEther(1));
    expect(serverId).to.equal(formatBytes32String('g4dn.xlarge'));

    ({pricePerHour, serverId} = await GPURental.templateInfo(formatBytes32String('template2')));
    expect(pricePerHour).to.equal(fromEther(2));
    expect(serverId).to.equal(formatBytes32String('g4dn.xlarge'));

    ({pricePerHour, serverId} = await GPURental.templateInfo(formatBytes32String('template3')));
    expect(pricePerHour).to.equal(fromEther(3));
    expect(serverId).to.equal(formatBytes32String('t2.small'));

  });

  it('should allow setting cpu limits', async () => {
    const {deployer} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'GPURental']);
    const GPURental = await ethers.getContract('GPURental', deployer);

    await GPURental.setGLimit(1, 4);
    await GPURental.setGLimit(2, 8);
    await GPURental.setTLimit(1, 16);
    await GPURental.setTLimit(2, 32);

    expect(await GPURental.gLimits(1)).to.equal(4);
    expect(await GPURental.gLimits(2)).to.equal(8);

    expect(await GPURental.tLimits(1)).to.equal(16);
    expect(await GPURental.tLimits(2)).to.equal(32);

    await GPURental.setGLimit(1, 2);
    expect(await GPURental.gLimits(1)).to.equal(2);
  });

  it('should allow setting min/max rental times', async () => {
    const {deployer} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'GPURental']);
    const GPURental = await ethers.getContract('GPURental', deployer);

    expect(await GPURental.minRentalTime()).to.equal(BigInt(1800));
    expect(await GPURental.maxRentalTime()).to.equal(BigInt(2592000));

    await GPURental.setMinRentalTime(BigInt(1));
    await GPURental.setMaxRentalTime(BigInt(100));

    expect(await GPURental.minRentalTime()).to.equal(BigInt(1));
    expect(await GPURental.maxRentalTime()).to.equal(BigInt(100));
  });

  it('should not allow calling onlyOwner functions if not owner', async () => {
    const {user1} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'GPURental']);
    const GPURental = await ethers.getContract('GPURental', user1);

    await assertOwnable(GPURental.setServer(formatBytes32String('tiny'), fromEther(1), 4));
    await assertOwnable(GPURental.setTemplate(formatBytes32String('template1'), formatBytes32String('small'), fromEther(1)));
    await assertOwnable(GPURental.removeServer(formatBytes32String('tiny')));
    await assertOwnable(GPURental.setGLimit(1, 16));
    await assertOwnable(GPURental.setTLimit(1, 16));
    await assertOwnable(GPURental.setDiskPrice(fromEther(1)));
    await assertOwnable(GPURental.cleanUpOldRentals());
    await assertOwnable(GPURental.setMinRentalTime(1));
    await assertOwnable(GPURental.setMaxRentalTime(100));
  });
});
