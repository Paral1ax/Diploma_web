import React from 'react';
import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import SendIcon from '@mui/icons-material/Send';

const ButtonWrapper = ({
    children,
    ...other
}) => {

    const { submitForm } = useFormikContext();

    const handleSubmit = () => {
        submitForm();
    }

    const config = {
        color: 'secondary',
        variant: 'outlined',
        fullWidth: true,
        onClick: handleSubmit
    }

    return (
        <Button {...config} endIcon={<SendIcon />}>
            {children}
        </Button>
    )
};

export default ButtonWrapper;