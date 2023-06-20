import {deployments, ethers, getNamedAccounts} from 'hardhat';
import {formatBytes32String} from 'ethers/lib/utils';
import {expect} from 'chai';
import {assertOwnable, fromEther} from './utils';

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

    await Heroicus.removeServer(formatBytes32String('t2.small'));
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
    await Heroicus.setTemplate(formatBytes32String('template1'), formatBytes32String('g4dn.xlarge'), fromEther(1));
    await Heroicus.setTemplate(formatBytes32String('template2'), formatBytes32String('g4dn.xlarge'), fromEther(2));
    await Heroicus.setTemplate(formatBytes32String('template3'), formatBytes32String('t2.small'), fromEther(3));

    let {pricePerHour, serverId} = await Heroicus.templateInfo(formatBytes32String('incorrect'));
    expect(pricePerHour).to.equal(0);

    ({pricePerHour, serverId} = await Heroicus.templateInfo(formatBytes32String('template1')));
    expect(pricePerHour).to.equal(fromEther(1));
    expect(serverId).to.equal(formatBytes32String('g4dn.xlarge'));

    ({pricePerHour, serverId} = await Heroicus.templateInfo(formatBytes32String('template2')));
    expect(pricePerHour).to.equal(fromEther(2));
    expect(serverId).to.equal(formatBytes32String('g4dn.xlarge'));

    ({pricePerHour, serverId} = await Heroicus.templateInfo(formatBytes32String('template3')));
    expect(pricePerHour).to.equal(fromEther(3));
    expect(serverId).to.equal(formatBytes32String('t2.small'));

  });

  it('should allow setting cpu limits', async () => {
    const {deployer} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'Heroicus']);
    const Heroicus = await ethers.getContract('Heroicus', deployer);

    await Heroicus.setGLimit(1, 4);
    await Heroicus.setGLimit(2, 8);
    await Heroicus.setTLimit(1, 16);
    await Heroicus.setTLimit(2, 32);

    expect(await Heroicus.gLimits(1)).to.equal(4);
    expect(await Heroicus.gLimits(2)).to.equal(8);

    expect(await Heroicus.tLimits(1)).to.equal(16);
    expect(await Heroicus.tLimits(2)).to.equal(32);

    await Heroicus.setGLimit(1, 2);
    expect(await Heroicus.gLimits(1)).to.equal(2);
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
    await assertOwnable(Heroicus.setTemplate(formatBytes32String('template1'), formatBytes32String('small'), fromEther(1)));
    await assertOwnable(Heroicus.removeServer(formatBytes32String('tiny')));
    await assertOwnable(Heroicus.setGLimit(1, 16));
    await assertOwnable(Heroicus.setTLimit(1, 16));
    await assertOwnable(Heroicus.setMinRentalTime(1));
    await assertOwnable(Heroicus.setMaxRentalTime(100));
    await assertOwnable(Heroicus.provideRefund(1));
  });
});
