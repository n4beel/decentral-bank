import * as React from 'react';
import Box from '@mui/material/Box';
import logo from './../../assets/images/icon.png'
import Button from './../Button'
import AddressBar from '../AddressBar';
import currencies from '../../utils/currencies';
import { Typography } from '@mui/material';
import { fromWei } from '../../utils/utils';

const Navbar = ({ account, connectWallet, rewardBalance, walletError }) => {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexGrow: 1,
      padding: '20px'
    }}>
      <div className="left">
        <img style={{
          width: 32
        }} src={logo} />
      </div>
      <div className="right">
        {
          !walletError
            ? account
              ? <Box sx={{
                backgroundColor: "#121212",
                padding: '6px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <img style={{
                  marginRight: 12,
                  width: 24,
                  height: 24,
                }} src={currencies.reward.image} alt={currencies.reward.symbol} />
                <Typography sx={{
                  marginRight: '24px',
                }} variant='h6' color="text.primary">{parseFloat(fromWei(rewardBalance)).toFixed(2)} {currencies.reward.symbol}</Typography>
                <AddressBar address={account} />
              </Box>
              : <Button onClick={connectWallet} variant="outlined" size="large">Connect Wallet</Button>
            : <Box sx={{
              backgroundColor: "#a30000b8",
              border: '1px solid #f00',
              borderRadius: '16px',
              padding: '4px 20px'
            }}>
              <Typography variant='h6' color="text.primary">Wallet Error</Typography>
            </Box>
        }
      </div>
    </Box>
  );
}

export default Navbar;