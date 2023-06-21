import {deployments, ethers, getNamedAccounts} from 'hardhat';
import {formatBytes32String} from 'ethers/lib/utils';
import {expect} from 'chai';
import {assertOwnable, fromUSDC} from './utils';

describe('Heroicus (admin)', () => {
  it('should allow setting server', async () => {
    const {deployer} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'Heroicus']);
    const Heroicus = await ethers.getContract('Heroicus', deployer);

    await Heroicus.setServer(formatBytes32String('g4dn.xlarge'), 4);
    await Heroicus.setServer(formatBytes32String('t2.small'), 16);

    let cpus = await Heroicus.serverConfigs(formatBytes32String('incorrect'));
    expect(cpus).to.equal(0);

    cpus = await Heroicus.serverConfigs(formatBytes32String('g4dn.xlarge'));
    expect(cpus).to.equal(4);

    cpus = await Heroicus.serverConfigs(formatBytes32String('t2.small'));
    expect(cpus).to.equal(16);

    await Heroicus.setServer(formatBytes32String('t2.small'), 8);
    cpus = await Heroicus.serverConfigs(formatBytes32String('t2.small'));
    expect(cpus).to.equal(8);

    await Heroicus.setServer(formatBytes32String('t2.small'), 0);
    cpus = await Heroicus.serverConfigs(formatBytes32String('t2.small'));
    expect(cpus).to.equal(0);
  });

  it('should fail setting server if not g or t', async () => {
    const {deployer} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'Heroicus']);
    const Heroicus = await ethers.getContract('Heroicus', deployer);

    await expect(Heroicus.setServer(formatBytes32String('small'), 16)).to.be
      .revertedWith('GPU: Only g or t servers are allowed');
  });

  it('should allow setting template', async () => {
    const {deployer} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'Heroicus']);
    const Heroicus = await ethers.getContract('Heroicus', deployer);

    await Heroicus.setServer(formatBytes32String('g4dn.xlarge'), 4);
    await Heroicus.setServer(formatBytes32String('t2.small'), 16);
    await Heroicus.setTemplate(formatBytes32String('template1'), formatBytes32String('g4dn.xlarge'), fromUSDC(1));
    await Heroicus.setTemplate(formatBytes32String('template2'), formatBytes32String('g4dn.xlarge'), fromUSDC(2));
    await Heroicus.setTemplate(formatBytes32String('template3'), formatBytes32String('t2.small'), fromUSDC(3));

    let {pricePerHour, serverId} = await Heroicus.templateInfo(formatBytes32String('incorrect'));
    expect(pricePerHour).to.equal(0);

    ({pricePerHour, serverId} = await Heroicus.templateInfo(formatBytes32String('template1')));
    expect(pricePerHour).to.equal(fromUSDC(1));
    expect(serverId).to.equal(formatBytes32String('g4dn.xlarge'));

    ({pricePerHour, serverId} = await Heroicus.templateInfo(formatBytes32String('template2')));
    expect(pricePerHour).to.equal(fromUSDC(2));
    expect(serverId).to.equal(formatBytes32String('g4dn.xlarge'));

    ({pricePerHour, serverId} = await Heroicus.templateInfo(formatBytes32String('template3')));
    expect(pricePerHour).to.equal(fromUSDC(3));
    expect(serverId).to.equal(formatBytes32String('t2.small'));

  });

  it('should allow setting cpu limits', async () => {
    const {deployer} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'Heroicus']);
    const Heroicus = await ethers.getContract('Heroicus', deployer);

    await Heroicus.setLimits(1, 16, 4);
    await Heroicus.setLimits(2, 32, 8);

    const region1Limits = await Heroicus.limits(1);
    const region2Limits = await Heroicus.limits(2);

    expect(region1Limits.g).to.equal(4);
    expect(region1Limits.t).to.equal(16);
    expect(region2Limits.g).to.equal(8);
    expect(region2Limits.t).to.equal(32);

    await Heroicus.setLimits(1, 2, 1);
    const newRegion1Limits = await Heroicus.limits(1);
    expect(newRegion1Limits.g).to.equal(1);
    expect(newRegion1Limits.t).to.equal(2);
  });

  it('should allow setting min/max rental times', async () => {
    const {deployer} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'Heroicus']);
    const Heroicus = await ethers.getContract('Heroicus', deployer);

    expect(await Heroicus.minRentalTime()).to.equal(BigInt(1800));
    expect(await Heroicus.maxRentalTime()).to.equal(BigInt(2592000));

    await Heroicus.setMinRentalTime(BigInt(1));
    await Heroicus.setMaxRentalTime(BigInt(100));

    expect(await Heroicus.minRentalTime()).to.equal(BigInt(1));
    expect(await Heroicus.maxRentalTime()).to.equal(BigInt(100));
  });

  it('should not allow calling onlyOwner functions if not owner', async () => {
    const {user1} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'Heroicus']);
    const Heroicus = await ethers.getContract('Heroicus', user1);

    await assertOwnable(Heroicus.setServer(formatBytes32String('tiny'), 4));
    await assertOwnable(Heroicus.setTemplate(formatBytes32String('template1'), formatBytes32String('small'), fromUSDC(1)));
    await assertOwnable(Heroicus.removeTemplate(formatBytes32String('tiny')));
    await assertOwnable(Heroicus.setLimits(1, 1, 1));
    await assertOwnable(Heroicus.setMinRentalTime(1));
    await assertOwnable(Heroicus.setMaxRentalTime(100));
    await assertOwnable(Heroicus.provideRefund(1));
  });
});
