import Web3 from 'web3';

export const shrinkAddress = address => `${address.substr(0, 6)}...${address.substr(address.length - 4, address.length - 1)}`

export const fromWei = amount => Web3.utils.fromWei(amount || '0')
export const toWei = amount => Web3.utils.toWei(amount || '0')