import React from 'react';

import classes from './Icecream.css';
import IcecreamIngredient from './IcecreamIngredient/IcecreamIngredient';

const icecream = ( props ) => {
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
        <div classname={classes.floatcontainer}>
            <div className={classes.floatLeft}>
            
            <h1> Welcome to the icecream builder!
            With this, you can build your own icecream!
            The pricing will be displayed.
            Press Checkout to order your icecream!
             </h1></div>
             
            <div className={classes.Icecream}>
            {transformedIngredients}
            <IcecreamIngredient type="cone" />
            
            </div>
        </div>
    );
};

export default icecream;