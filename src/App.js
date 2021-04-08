
import './App.css';
import TestScene from './TestScene';
// import { findByLabelText } from '@testing-library/dom';

function App() {

  return (
    <div className="App">
      <h1>Babylon Canvas Test</h1>
        <div  className="sceneStyles">
          <TestScene/>
        </div>
    </div>
  );
}

export default App;
