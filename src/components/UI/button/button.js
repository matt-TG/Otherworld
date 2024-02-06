import React from 'react';

import classes from './button.css'

const button=(props)=>(

    <button onClick={props.clicked} className={[classes.Button, classes[props.btnType]].join(' ')} disabled={props.disabled}>{props.children}</button>

);

// for disabled={props.disabled} see React instruections 91) 

export default button;