import { createTheme } from '@mui/material';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';

export default createTheme({
  typography: {
    h3: {
      fontWeight: 100,
    },
  },
  palette: {
    common: {},
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
  },
});
