import {deployments, ethers, getNamedAccounts} from "hardhat";
import {formatBytes32String} from "ethers/lib/utils";
import {expect} from "chai";
import {fromEther, getBlockTime} from "./utils";

const HOUR = 60 * 60;

describe('GPURental', (accounts) => {
  it('should allow renting 1 hour', async () => {
    const {user1} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'GPURental', 'Test']);
    const GPURental = await ethers.getContract('GPURental', user1);

    await expect(GPURental.rent(formatBytes32String("tiny"), 1, fromEther('0.1'))).to.emit(GPURental, 'Rent').withArgs(1);
    const blockTimestamp = await getBlockTime();
    const [userInfo, expired] = await GPURental.userInfo(BigInt(1));
    expect(userInfo.user).to.equal(user1);
    expect(userInfo.expires).to.equal(BigInt(blockTimestamp + 3600));
    expect(userInfo.templateId).to.equal(formatBytes32String("tiny"));
    expect(userInfo.region).to.equal(1);
    expect(expired).to.equal(false);
  });

  it('should not allow renting invalid template ', async () => {
    const {user1} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'GPURental']);
    const GPURental = await ethers.getContract('GPURental', user1);

    await expect(GPURental.rent(formatBytes32String("tiny"), 1, fromEther('0.1'))).to.be.revertedWith("template not found");
  });

  it('should not allow renting if no cpus available', async () => {
    const {user1} = await getNamedAccounts();
    await deployments.fixture(['USDC', 'GPURental']);
    const GPURental = await ethers.getContract('GPURental', user1);

    await expect(GPURental.rent(formatBytes32String("tiny"), 1, fromEther('0.1'))).to.be.revertedWith("template not found");
  });
});
