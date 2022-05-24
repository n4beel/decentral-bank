import { Typography } from '@mui/material';
import React from 'react'

const CurrencyInput = (props) => {
    const { right, balance, readOnly, value } = props;

    return (
        <div style={{
            background: "rgb(33, 36, 41)",
            padding: 16,
            borderRadius: 16,
            marginBottom: 10,
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <div style={{
                    flexGrow: 1,
                    marginRight: 16,
                }}>
                    <input style={{
                        width: '100%',
                        fontSize: 38,
                        background: 'rgb(33, 36, 41)',
                        border: 'none',
                        color: '#fff',
                        outlineStyle: 'none',
                        boxShadow: 'none',
                        borderColor: 'transparent',
                        lineHeight: '1.1',
                        fontFamily: "'Roboto Mono', monospace"
                    }}
                        readOnly={readOnly}
                        value={value}
                        type="number"
                        placeholder='0.0' />
                </div>
                {
                    props.children
                }
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row-reverse'
            }}>

                {
                    "balance" in props
                        ? <Typography sx={{
                            marginTop: '12px'
                        }} color="text.secondary">
                            Balance : {balance}
                        </Typography>
                        : null
                }
            </div>
        </div>
    )
}

export default CurrencyInput