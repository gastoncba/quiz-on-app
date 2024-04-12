import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';

import { themeMaterial } from './settings';
import { RoutesController } from './routes/RouterController.routes';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <ThemeProvider theme={themeMaterial}>
        <ToastContainer />
        <Container maxWidth="xl">
          <RoutesController />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
