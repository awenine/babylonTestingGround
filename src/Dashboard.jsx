import React, { useState } from 'react';
import ControlPanel from './ControlPanel';
import DisplayPanel from './DisplayPanel';
import TestScene from './TestScene';

const Dashboard = () => {
  const [testProp, setTestProp] = useState([0,1,0]);
  const [testClick, setTestClick] = useState("waiting for click");


  function handler() {
    setTestProp([1,2,1])
    console.log("clicked")
  }

  function handleClickSuzanne() {
    setTestClick("suzanne clicked")
  }

  return ( 
    <div>
      <TestScene testProp={testProp} testClick={handleClickSuzanne}/>
      <ControlPanel handler={handler}/>
      <DisplayPanel testContent={testClick}/>
    </div>
   );
}
 
export default Dashboard;