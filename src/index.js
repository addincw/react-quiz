import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { QuizProvider } from "./store/QuizContext";

ReactDOM.render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

