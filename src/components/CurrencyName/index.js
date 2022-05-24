import { Typography } from '@mui/material'
import React from 'react'

const Currency = ({ image, symbol }) => {
    return (
        <div style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: "rgb(44, 47, 54)",
            padding: '6px 16px',
            borderRadius: 16,
        }}>
            <img style={{
                marginRight: 12,
                width: 24
            }} src={image} alt={symbol} />
            <Typography variant='h6'>{symbol}</Typography>
        </div>
    )
}

export default Currency