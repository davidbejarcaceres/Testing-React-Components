import React from 'react';
import logo from './logo.svg';
import './App.css';
import ErrorMessage from './components/ErrorMessage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>App para probar los componentes</h1>
        <br/>
        <ErrorMessage
          />
      </header>
    </div>
  );
}

export default App;
