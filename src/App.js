import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Web3 from 'web3';
import Tether from './truffle_abis/Tether.json';
import Reward from './truffle_abis/Reward.json';
import DecentralBank from './truffle_abis/DecentralBank.json';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)'
    }
  },
});

function App() {
  const [account, setAccount] = useState(null)
  const [tether, setTether] = useState({})
  const [reward, setReward] = useState({})
  const [decentralBank, setDecentralBank] = useState({})
  const [tetherBalance, setTetherBalance] = useState(0)
  const [rewardBalance, setRewardBalance] = useState(0)
  const [stakingBalance, setStakingBalance] = useState(0)
  const [loading, setLoading] = useState(true)

  const connectWallet = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      await loadBlockChainData()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      await loadBlockChainData()
    }
    else {
      window.alert("No support for web3")
    }
  }

  const loadBlockChainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkID = await web3.eth.net.getId();

    const tetherData = await Tether.networks[networkID]
    const rewardData = await Reward.networks[networkID]
    const decentralBankData = await DecentralBank.networks[networkID]

    setAccount(accounts[0])

    if (tetherData) {
      const _tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      const _tetherBalance = await _tether.methods.balance(accounts[0]).call();

      setTether(_tether);
      setTetherBalance(_tetherBalance.toString())
    }
    else {
      window.alert("Wrong Tether Network")
    }
    if (rewardData) {
      const _reward = new web3.eth.Contract(Reward.abi, rewardData.address);
      const _rewardBalance = await _reward.methods.balance(accounts[0]).call();

      setReward(_reward);
      setRewardBalance(_rewardBalance.toString())
    }
    else {
      window.alert("Wrong Reward Network")
    }
    if (decentralBankData) {
      const _decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
      const _decentralBankBalance = await _decentralBank.methods.stakingBalance(accounts[0]).call();

      setDecentralBank(_decentralBank);
      setStakingBalance(_decentralBankBalance.toString())
    }
    else {
      window.alert("Wrong Decentral Bank Network")
    }
    setLoading(false)
  }

  const navProps = {
    account,
    rewardBalance,
    connectWallet
  }

  const cardProps = {
    tetherBalance,
    stakingBalance
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Navbar {...navProps} />
        <main>
          <Card {...cardProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
