import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button, { FullWidthButton } from './../Button';
import Typography from '@mui/material/Typography';
import CurrencyInput from '../CurrencyInput';
import currencies from '../../utils/currencies';
import CurrencyName from './../CurrencyName';

export default function BasicCard({ tetherBalance,
    stakingBalance }) {

    const currencyInputBankProps = {
        value: stakingBalance,
        readOnly: true
    }
    const currencyInputUserProps = {
        readOnly: false,
        balance: tetherBalance,
    }

    return (
        <Card sx={{ minWidth: 275, borderRadius: '24px', }}>
            <Box sx={{
                padding: '1rem 1.25rem 0.5rem',
            }}>
                <Typography sx={{ fontSize: 22 }} color="text.primary" gutterBottom>
                    Stake
                </Typography>
            </Box>
            <Box sx={{
                padding: '12px',
            }}>
                <CurrencyInput {...currencyInputBankProps}>
                    <Button>Unstake</Button>
                </CurrencyInput>
                <CurrencyInput {...currencyInputUserProps}>
                    <CurrencyName image={currencies.musdt.image} symbol={currencies.musdt.symbol} />
                </CurrencyInput>
                <FullWidthButton onClick={() => console.log("hello")} variant="outlined" size="large">Stake</FullWidthButton>
            </Box>
        </Card>
    );
}