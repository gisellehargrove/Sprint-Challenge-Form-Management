import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FormikLoginForm from './Components/Form';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
