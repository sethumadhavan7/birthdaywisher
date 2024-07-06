import React from 'react';
import './App.css';
import UserForm from './components/UserForm';

function App() {
  return (
    <div className="App">
      <h1 className='bwh'>Birthday Wisher
      <UserForm /></h1>
      <div className='footerimg'>
        <img src="./images/heart.webp" alt=""/>
      </div>
    </div>
  );
}

export default App;
