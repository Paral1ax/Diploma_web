import React from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ButtonWrapper = ({
    children,
    ...other
}) => {

    const handleSubmit = () => {

    }

    const config = {
        size: 'large',
        color: 'secondary',
        variant: 'outlined',
        fullWidth: true,
        onClick: handleSubmit
    }

    return (
        <Button {...config}>
            {children}
        </Button>
    )
};

export default ButtonWrapper;