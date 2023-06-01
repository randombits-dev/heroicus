import {deployments, ethers} from "hardhat";

import {expect} from 'chai';

// const setupTest = deployments.createFixture(
//   async ({deployments, getNamedAccounts, ethers}, options) => {
//     await deployments.fixture(); // ensure you start from a fresh deployments
//     const {deployer, user1} = await getNamedAccounts();
//     const TokenContract = await ethers.getContract('Token', tokenOwner);
//     await TokenContract.mint(10).then((tx) => tx.wait()); //this mint is executed once and then `createFixture` will ensure it is snapshotted
//     return {
//       tokenOwner: {
//         address: tokenOwner,
//         TokenContract,
//       },
//     };
//   }
// );

const setupTest = deployments.createFixture(
  async ({deployments, getNamedAccounts, ethers}, options) => {
    await deployments.fixture(); // ensure you start from a fresh deployments
    const {deployer} = await getNamedAccounts();
    const usdc = await deployments.deploy('USDC', {
      contract: 'TestToken',
      from: deployer,
      args: ['USDC', 'USDC'],
      log: true,
    });
    return {
      usdc
    };
  }
);

describe('USDC', (accounts) => {

  it('should have minted', async () => {
    const {user1} = await getNamedAccounts();
    await deployments.fixture(['USDC']);
    await deployments.execute('USDC', {from: user1}, 'giveMe', ethers.utils.parseEther('100'));
    const result = await deployments.read('USDC', 'balanceOf', user1);
    expect(Number(ethers.utils.formatEther(result))).to.equal(100);
  });
//     it('should call a function that depends on a linked library', async () => {
//         const metaCoinInstance = await MetaCoin.deployed();
//         const metaCoinBalance = (await metaCoinInstance.getBalance.call(accounts[0])).toNumber();
//         const metaCoinEthBalance = (await metaCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();
//
//         assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
//     });
//     it('should send coin correctly', async () => {
//         const metaCoinInstance = await MetaCoin.deployed();
//
//         // Setup 2 accounts.
//         const accountOne = accounts[0];
//         const accountTwo = accounts[1];
//
//         // Get initial balances of first and second account.
//         const accountOneStartingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
//         const accountTwoStartingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();
//
//         // Make transaction from first account to second.
//         const amount = 10;
//         await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });
//
//         // Get balances of first and second account after the transactions.
//         const accountOneEndingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
//         const accountTwoEndingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();
//
//         assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
//         assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
//     });
});
