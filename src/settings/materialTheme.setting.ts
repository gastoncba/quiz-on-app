import { createTheme } from '@mui/material/styles';

export const themeMaterial = createTheme({
  typography: {
    fontFamily: 'Epilogue, sans-serif;',

    h1: {
      fontFamily: 'Epilogue, sans-serif;',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Epilogue, sans-serif;',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Epilogue, sans-serif;',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'Epilogue, sans-serif;',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'Epilogue, sans-serif;',
      fontWeight: 700,
    },
    h6: {
      fontFamily: 'Epilogue, sans-serif;',
      fontWeight: 700,
    },
    button: {
      textTransform: 'capitalize',
    },
  },

  palette: {
    primary: {
      light: '#C418FF',
      main: '#8F59A8',
      dark: '#291A4A',
      contrastText: '#fff',
    },
    success: {
      main: '#1dbf17',
    },
    warning: {
      light: '#ef0f0f',
      main: '#c20a12',
    },
    text: {
      primary: '#121212',
    },
  },

  components: {},
});
