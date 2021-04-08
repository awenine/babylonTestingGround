import logo from './logo.svg';
import './App.css';
import TestScene from './TestScene';
import { findByLabelText } from '@testing-library/dom';

function App() {
  const sceneStyles = {
    width: '100%',
  }
  const containerStyles = {
    width: '90%',
    display: 'flex'
  }
  return (
    <div className="App">
      App rendering
      <div style={containerStyles}>
        <div  style={sceneStyles}>
          <TestScene/>
        </div>
      </div>
    </div>
  );
}

export default App;
