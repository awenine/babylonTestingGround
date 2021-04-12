import React from 'react';


//? This component created to show click events from within the canvas being passed up and then to other parts of the application 

const DisplayPanel = ({ testContent }) => {
  return ( 
    <div>
      {testContent}
    </div>
   );
}
 
export default DisplayPanel;