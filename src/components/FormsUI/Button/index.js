import React from 'react';
import { Button } from '@mui/material';
import { useFormikContext } from 'formik';


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
        <Button {...config}>
            {children}
        </Button>
    )
};

export default ButtonWrapper;