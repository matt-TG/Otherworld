import React from 'react';

import classes from './navigationItem.css';

import {NavLink} from 'react-router-dom';

const navigationItem=(props)=>(

    <li className={classes.NavigationItem}>
    <NavLink 
    to={props.link} exact={props.exact} activeClassName={classes.active}>
    {props.children}
    </NavLink>
    </li>

);

//We had link element (a) before we started using NavLink component, within a we had className: className={props.active? classes.active: null}. With NavLink, the component gets assigned "active" as a className when the link is clicked. Our naming convention here allows us to keep .css file the same even though we use NavLink because there is already style rules for active class. When setting up styles in css, css treats the NavLink the same as link element a, so .NavigationItem a.active refers also to Navlink that has "active" class. See React instructions 85) for how to overcome class name issue when using css modules in React.

export default navigationItem;