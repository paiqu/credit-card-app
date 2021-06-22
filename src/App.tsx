import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ICard } from './constants/types';

// pages
import FormPage from './pages/FormPage';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8BB8F5',
      light: '#beeaff',
      dark: '#5888c2',
      // contrastText: '#f0f0f0',
      contrastText: '#f0f0f0',
    },
    secondary: {
      main: '#F5C88B',
      light: '#fffbbc',
      dark: '#c1975d',
      contrastText: '#000000',
    },
  },
  overrides: {
    MuiStepIcon: {
      root: {
        '&$completed': {
          color: '#F5C88B',
        },
        '&$active': {
          color: '#F5C88B',
        },
      },
      active: {},
      completed: {},
    }
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={FormPage} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
