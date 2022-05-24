import React from 'react'
import Button from '@mui/material/Button';

const CustomButton = (props) => {
    return (
        <Button style={{
            borderRadius: 15,
            backgroundColor: "#004a85e3",
            padding: '8px 30px'
        }} {...props}>
            {props.children}
        </Button>
    )
}

export const FullWidthButton = (props) => {
    return (
        <Button style={{
            borderRadius: 15,
            backgroundColor: "#004a85e3",
            width: '100%'
        }} {...props}>
            {props.children}
        </Button>
    )
}

export default CustomButton