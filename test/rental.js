const TestToken = artifacts.require("TestToken");
const GPURental = artifacts.require("GPURental");

contract('GPURental', (accounts) => {
    // beforeAll(async () => {
    //     const rental = await GPURental.deployed();
    //
    // });

    it('should allow renting 1 hour', async () => {
        const usdc = await TestToken.deployed();
        const rental = await GPURental.deployed();
        await rental.setTemplate(web3.utils.fromUtf8("template1"), web3.utils.toBN(100), web3.utils.toBN(2), {from: accounts[0]});
        await rental.rent(web3.utils.fromUtf8("template1"), web3.utils.toBN(200), web3.utils.toBN(0), {from: accounts[2]});

        const devBalance = await usdc.balanceOf(accounts[1]);

        assert.equal(devBalance.valueOf(), 200);
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
