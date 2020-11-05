import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {
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

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;