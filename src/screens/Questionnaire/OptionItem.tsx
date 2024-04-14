import React from 'react';

import { Button, Icon } from '../../components';
import { Option } from '../../models';
import { styles } from '../../settings';

interface Props {
  option: Option;
  selectOption: (isCorrect: boolean) => void;
  wasSelected: boolean;
}

const { green, red } = styles.color;

export const OptionItem: React.FunctionComponent<Props> = ({
  option,
  selectOption,
  wasSelected,
}) => {
  return (
    <>
      <Button
        title={option.value}
        onClick={() => selectOption(option.isCorrect)}
        colorHover={
          wasSelected ? (option.isCorrect ? green : red) : 'primary.main'
        }
        startIcon={
          wasSelected ? (
            <Icon type={option.isCorrect ? 'CHECK' : 'CROSS'} />
          ) : undefined
        }
        style={{
          width: '100%',
          bgcolor: wasSelected
            ? option.isCorrect
              ? green
              : red
            : 'primary.main',
        }}
      />
    </>
  );
};
