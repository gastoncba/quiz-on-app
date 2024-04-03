import { createTheme } from '@mui/material/styles';

export const themeMaterial = createTheme({
  typography: {
    fontFamily: 'Gilroy-Regular, sans-serif;',

    h1: {
      fontFamily: 'Gilroy-Bold, sans-serif;',
    },
    h2: {
      fontFamily: 'Gilroy-Bold, sans-serif;',
    },
    h3: {
      fontFamily: 'Gilroy-Bold, sans-serif;',
    },
    h4: {
      fontFamily: 'Gilroy-Bold, sans-serif;',
    },
    h5: {
      fontFamily: 'Gilroy-Bold, sans-serif;',
    },
    h6: {
      fontFamily: 'Gilroy-Bold, sans-serif;',
    },
    button: {
      textTransform: 'capitalize',
      fontFamily: 'Gilroy-Bold, sans-serif;',
    },
  },

  palette: {
    primary: {
      light: '#ff339f',
      main: '#f08',
      dark: '#b2005f',
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
