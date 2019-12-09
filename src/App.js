import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, Container, Link, Typography } from '@material-ui/core';
import theme from './theme';
import Signature from './Signature';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://github.com/tsamaya/react-signature">
      tsamaya
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

const App = () => (
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Signature
        </Typography>
        <Signature />
        <Copyright />
      </Box>
    </Container>
  </ThemeProvider>
);

export default App;
