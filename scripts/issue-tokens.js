const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function (callback) {
    const decentralBank = await DecentralBank.deployed();
    await decentralBank.issueTokens();

    console.log("Tokens successfully issued");
    callback();
}