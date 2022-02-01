import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import useRotate from './useRotate';
function App() {
  const {target} = useRotate<HTMLDivElement>()
  return (
    <div className="App">
      <div className='content' ref={target}></div>
    </div>
  );
}

export default App;
