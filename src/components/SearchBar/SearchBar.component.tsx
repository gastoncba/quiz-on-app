import React from 'react';
import { Autocomplete, Paper, InputBase, Box } from '@mui/material';
import { Icon } from '../Icon/Icon.component';

interface SearchBarProps {
  options: string[];
  onChange: (value: string | null) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ options, onChange }) => {
  return (
    <>
      <Autocomplete
        freeSolo
        id="search-bar"
        clearIcon={<Icon type="CLOSE" />}
        options={options.map((option) => option)}
        onChange={(event, value) => onChange(value)}
        renderInput={(params) => (
          <Paper
            component="div"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
            }}
          >
            <Box sx={{ p: '10px' }}>
              <Icon type="SEARCH" />
            </Box>
            <InputBase
              {...params.InputProps}
              autoFocus
              inputProps={{
                ...params.inputProps,
                'aria-label': 'search',
              }}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar"
            />
          </Paper>
        )}
      />
    </>
  );
};
