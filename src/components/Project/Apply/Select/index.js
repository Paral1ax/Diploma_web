import React from "react";
import { TextField, MenuItem, Box } from '@mui/material';

const SelectWrapper = (
    name,
    teams,
    ...otherProps
) => {
    const handleChange = evt => {
        const { value } = evt.target;
      };

    const configSelect = {
        ...otherProps,
        select: true,
        variant: 'outlined',
        fullWidth: true,
        onChange: handleChange
      };

    return (
        <Box>
            {teams.map((item) => (
                console.log(item)
            ))}
      </Box>
    )
}

export default SelectWrapper