import { Router } from 'next/router';
import NPropgress from 'nprogress';
import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { theme } from '../theme';
import Nav from '../components/Nav';
import Container from '@material-ui/core/Container/Container';
import Box from '@material-ui/core/Box/Box';

Router.events.on('routeChangeStart', () => NPropgress.start());
Router.events.on('routeChangeComplete', () => NPropgress.done());
Router.events.on('routeChangeError', () => NPropgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav/>
        <Container maxWidth={false}>
          <Box marginTop={2}>
            <Component {...pageProps} />  
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default MyApp
