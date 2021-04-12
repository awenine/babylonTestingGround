import React from 'react';

const ControlPanel = ({ handler }) => {
  return ( 
    <div>
      <button onClick={handler}>
        change camera
      </button>
    </div>
   );
}
 
export default ControlPanel;