// const { assert } = require('console');

const Tether = artifacts.require('Tether');
const Reward = artifacts.require('Reward');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DecentralBank', ([owner, customer]) => {
    let tether, reward, decentralBank;

    const tokens = n => web3.utils.toWei(n, 'ether')

    before(async () => {
        // Load Contracts
        tether = await Tether.new();
        reward = await Reward.new();
        decentralBank = await DecentralBank.new(reward.address, tether.address);

        // Transfer all reward tokens to decentral bank - 1 million - 1000000000000000000000000
        await reward.transfer(decentralBank.address, tokens('1000000'))

        // Transfer 100 mUSDT to investor - 100 - 100000000000000000000
        await tether.transfer(customer, tokens('100'), { from: owner })
    })

    describe('Mock Tether Deployment', async () => {
        it('name matches successfully', async () => {
            const name = await tether.name()
            assert.equal(name, 'Mock Tether Token')
        })
    })

    describe('Reward Token Deployment', async () => {
        it('name matches successfully', async () => {
            const name = await reward.name()
            assert.equal(name, 'Reward Token')
        })
    })

    describe('Decentral Bank Deployment', async () => {
        it('name matches successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })

        it('has 1 million reward tokens', async () => {
            const rewardBalance = await reward.balance(decentralBank.address);
            assert.equal(rewardBalance.toString(), tokens('1000000'))
        })
    })
    describe('Yield Farming', async () => {
        it('reward tokens for staking', async () => {
            // Check if the investor has 100 mUSDT
            let balanceBeforeStaking = await tether.balance(customer);
            assert.equal(balanceBeforeStaking.toString(), tokens('100'), 'investor mock wallet before staking');

            // Stake 100 mUSDT
            await tether.setAllowance(decentralBank.address, tokens('100'), { from: customer });
            await decentralBank.depositTokens(tokens('100'), { from: customer });

            // Check customer's staking balance
            let stakingBalanceBefore = await decentralBank.stakingBalance(customer);
            assert.equal(stakingBalanceBefore.toString(), tokens('100'), 'customer\'s staking balance after staking');

            // Check if the investor has 0 mUSDT
            let balanceAfterStaking = await tether.balance(customer);
            assert.equal(balanceAfterStaking.toString(), tokens('0'), 'investor mock wallet after staking');

            // Check if the bank has 100 mUSDT
            let banksBalanceAfterStaking = await tether.balance(decentralBank.address);
            assert.equal(banksBalanceAfterStaking.toString(), tokens('100'), 'bank\'s mock wallet after staking');

            // Check of the investor is staking
            let isStaking = await decentralBank.isStaking(customer);
            assert.isTrue(isStaking)

            // Check issue tokens function
            await decentralBank.issueTokens({ from: owner });
            await decentralBank.issueTokens({ from: customer }).should.be.rejected;

            // Check customer's staking reward
            const rewards = await reward.balance(customer);
            assert.equal(rewards.toString(), tokens('100') / 9, 'customer\`s staking reward');

            await decentralBank.unstakeTokens({ from: customer });

            // Check customer's staking balance
            let stakingBalanceAfter = await decentralBank.stakingBalance(customer);
            assert.equal(stakingBalanceAfter.toString(), tokens('0'), 'customer\'s staking balance after unstaking');

            // Check if the investor has 100 mUSDT
            let balanceAfterUnstaking = await tether.balance(customer);
            assert.equal(balanceAfterUnstaking.toString(), tokens('100'), 'investor mock wallet after unstaking');

            // Check if the bank has 0 mUSDT
            let banksBalanceAfterUntaking = await tether.balance(decentralBank.address);
            assert.equal(banksBalanceAfterUntaking.toString(), tokens('0'), 'bank\'s mock wallet after unstaking');

        })
    })
})