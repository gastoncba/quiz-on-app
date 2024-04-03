import React from 'react';
import { useLocation } from 'react-router-dom';

import { Button, Paragraph } from '../../components';
import { Category } from '../../models';
import { Box } from '@mui/material';

interface QuestionnaireProps {}

interface CustomizedState {
  category: Category;
}

export const QuestionnaireScreen: React.FC<QuestionnaireProps> = () => {
  const location = useLocation();
  const state: CustomizedState = location.state;
  const { category } = state;

  return (
    <>
      <Paragraph text={'Empieza este Quiz!'} variant="h3" align="center" />
      <Paragraph text={'Categoria ' + category.name} align="center" />
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        <Button title="Empezar" onClick={() => {}} />
      </Box>
    </>
  );
};
