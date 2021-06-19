import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// pages
import FormPage from './pages/FormPage';

const initialFormState = {
  username: '',
  name: '',
  email: '',
};

const defaultCard: ICard = {
  number: "888888888888888",
  name: "First Last",
  expiry: "02/04",
  cvv: "817",
};

type ICard = {
  number: string,
  name: string,
  expiry: string,
  cvv: string,
}

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={FormPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
