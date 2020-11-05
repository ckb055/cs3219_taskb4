import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './IcecreamIngredient.css';

class IcecreamIngredient extends Component {
    render () {
        let ingredient = null;

        switch ( this.props.type ) {
            case ( 'cone' ):
                ingredient = <div className={classes.Cone}></div>;
                break;
            case ( 'bread-top' ):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ( 'chocolateSauce' ):
                ingredient = <div className={classes.ChocolateSauce}></div>;
                break;
            case ( 'strawberryScoop' ):
                ingredient = <div className={classes.StrawberryScoop}></div>;
                break;
            case ( 'chocolateScoop' ):
                ingredient = <div className={classes.ChocolateScoop}></div>;
                break;
            default:
                ingredient = null;
        }

        return ingredient;
    }
}

IcecreamIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default IcecreamIngredient;