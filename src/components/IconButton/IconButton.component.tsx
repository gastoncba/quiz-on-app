import React from 'react';
import { SxProps, Theme } from '@mui/material';
import { IconButton as MuiIconButton } from '@mui/material';

interface IconButtonProps {
  icon: any;
  onClick?: any;
  onMouseOver?: () => any;
  onMouseLeave?: () => any;
  buttonStyle?: SxProps<Theme>;
  size?: 'large' | 'medium' | 'small';
  colorHover?: string;
}

export const IconButton: React.FunctionComponent<IconButtonProps> = (
  props: IconButtonProps
) => {
  return (
    <MuiIconButton
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        ...props.buttonStyle,
        ':hover': { bgcolor: props.colorHover || 'primary.dark' },
      }}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
      size={props.size}
    >
      {props.icon}
    </MuiIconButton>
  );
};
