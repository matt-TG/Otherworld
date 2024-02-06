import React from 'react';

import classes from './spinner.css';

const spinner=(props)=>(

<div className={classes.Loader}>Loading...</div>

);

//"loading" inside the div is only a fallback in case the animation doesn't work for some reason

export default spinner;