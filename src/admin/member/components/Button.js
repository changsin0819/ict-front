/****************************************
* component/Button.js
*****************************************/
import React from 'react'; 

const Button = ({text, onClick}) => (
    <button onClick={onClick} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        {text}
    </button>
);
export default Button;
