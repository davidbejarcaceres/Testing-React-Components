import React from 'react';
import logo from './logo.svg';
import './App.css';
import ErrorMessage from './components/ErrorMessage';
import TdImageIconPicker from "./components/Tooltips"
import InputColorPicker from './components/ColorComp';

function handleOnChange(obj){
  console.log(obj);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>learn react: App para probar los componentes</h1>
        <br/>
        {/* <Tooltips onChange={handleOnChange}/> */}
        <TdImageIconPicker onChange={handleOnChange}></TdImageIconPicker>
      </header>
    </div>
  );
}

export default App;
