import { ThemeProvider } from '@emotion/react';

import { themeMaterial } from './settings/materialTheme.setting';
import { Typography } from '@mui/material';

const App = () => {
  return (
    <>
      <ThemeProvider theme={themeMaterial}>
        <Typography variant="h1">Quiz On</Typography>
        <Typography variant="h2">Bienvenido</Typography>
        <Typography variant="body1">
          Empeza a constestar nuestros quiz
        </Typography>
      </ThemeProvider>
    </>
  );
};

export default App;
