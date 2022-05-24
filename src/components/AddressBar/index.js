import React from 'react'
import Typography from '@mui/material/Typography';
import { shrinkAddress } from '../../utils/utils';
import { Box } from '@mui/material';

const AddressBar = ({ address }) => {
    return (
        <Box sx={{
            borderRadius: '15px',
            backgroundColor: 'rgb(33, 36, 41)',
            justifyContent: 'center',
            fontFamily: "'Roboto','Helvetica','Arial','sans-serif'",
            fontWeight: 500,
            fontSize: '0.9375rem',
            lineHeight: 1.75,
            letterSpacing: '0.02857em',
            padding: '7px 21px',
            border: '1px solid rgb(55 57 60)',
            color: '#90caf9',
        }}>

            <Typography variant='body1'>
                {shrinkAddress(address)}
            </Typography>
        </Box>
    )
}

export default AddressBar