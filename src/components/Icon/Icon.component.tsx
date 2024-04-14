import { SxProps, Theme } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export type IconT = 'PLUS' | 'CLOSE' | 'SEARCH' | 'CHECK' | 'CROSS';

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
    case 'SEARCH':
      return <SearchIcon sx={props.sx} className={props.className} />;
    case 'CHECK':
      return (
        <CheckCircleOutlineIcon sx={props.sx} className={props.className} />
      );
    case 'CROSS':
      return <CancelOutlinedIcon sx={props.sx} className={props.className} />;
    default:
      return <></>;
  }
};
