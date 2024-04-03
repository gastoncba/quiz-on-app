import { SxProps, Theme } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';

export type IconT = 'PLUS' | 'CLOSE';

export interface IconProps {
  type: IconT;
  sx?: SxProps<Theme>;
  className?: string;
}

export const Icon: React.FunctionComponent<IconProps> = (props: IconProps) => {
  switch (props.type) {
    case 'PLUS':
      return <AddOutlinedIcon sx={props.sx} className={props.className} />;
    case 'CLOSE':
      return <CloseIcon sx={props.sx} className={props.className} />;
    default:
      return <></>;
  }
};
