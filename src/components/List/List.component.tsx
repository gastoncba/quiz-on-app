import React from 'react';
import {
  List as ListMUI,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import { Divider } from '../Divider/Divider.component';

export interface Item {
  primaryText: string;
  secondaryText?: string;
  icon?: JSX.Element;
  value: any;
  id: number;
  primaryTypographyStyles?: React.CSSProperties;
  secondaryTypographyStyles?: React.CSSProperties;
}

interface Props {
  items: Item[];
  divider?: boolean;
  button?: boolean;
  onClick?: (item: Item) => void;
  secondaryAction?: JSX.Element;
}

export const List: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <ListMUI>
        {props.items.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              {props.button ? (
                <ListItemButton
                  onClick={() => props.onClick && props.onClick(item)}
                >
                  {item.icon && <ListItemAvatar>{item.icon}</ListItemAvatar>}
                  <ListItemText
                    primary={item.primaryText}
                    secondary={item.secondaryText}
                    primaryTypographyProps={{
                      component: 'div',
                      style: {
                        ...item.primaryTypographyStyles,
                      },
                    }}
                    secondaryTypographyProps={{
                      component: 'div',
                      style: {
                        whiteSpace: 'pre-line',
                        ...item.secondaryTypographyStyles,
                      },
                    }}
                  />
                </ListItemButton>
              ) : (
                <ListItem
                  secondaryAction={props.secondaryAction}
                  onClick={() => props.onClick && props.onClick(item)}
                >
                  {item.icon && <ListItemAvatar>{item.icon}</ListItemAvatar>}
                  <ListItemText
                    primary={item.primaryText}
                    secondary={item.secondaryText}
                    primaryTypographyProps={{
                      component: 'div',
                      style: {
                        ...item.primaryTypographyStyles,
                      },
                    }}
                    secondaryTypographyProps={{
                      component: 'div',
                      style: {
                        whiteSpace: 'pre-line',
                        ...item.secondaryTypographyStyles,
                      },
                    }}
                  />
                </ListItem>
              )}
              {props.divider && index !== props.items.length - 1 && (
                <Divider variant="middle" />
              )}
            </React.Fragment>
          );
        })}
      </ListMUI>
    </>
  );
};
