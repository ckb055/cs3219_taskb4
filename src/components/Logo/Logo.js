import React from 'react';

import icecreamLogo from '../../assets/images/icecream-builder-logo.jpg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={icecreamLogo} alt="MyIcecream" />
    </div>
);

export default logo;