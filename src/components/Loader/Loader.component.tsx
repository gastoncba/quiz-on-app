import { CircularProgress, Box, SxProps, Theme } from '@mui/material';

export interface Props {
  size?: number;
  sx?: SxProps<Theme>;
}

export const Loader: React.FunctionComponent<Props> = ({ size, sx }) => {
  return (
    <Box display={'flex'} justifyContent="center" sx={sx}>
      <CircularProgress size={size || 30} sx={{ color: 'white' }} />
    </Box>
  );
};
