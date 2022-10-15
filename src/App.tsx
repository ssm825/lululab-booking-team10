import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

import Layout from './layout/Layout';
import Main from './container/Main';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Main />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
