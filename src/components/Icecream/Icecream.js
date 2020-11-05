import React from 'react';

import classes from './Icecream.css';
import IcecreamIngredient from './IcecreamIngredient/IcecreamIngredient';

const burger = ( props ) => {
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                return <IcecreamIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            {transformedIngredients}
            <IcecreamIngredient type="cone" />
        </div>
    );
};

export default burger;