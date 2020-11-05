import React, { Component } from 'react';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from "../../hoc/Auxilliary";
import Icecream from "../../components/Icecream/Icecream";
import BuildControls from "../../components/Icecream/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Icecream/OrderSummary/OrderSummary";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
    strawberryScoop: 1.0,
    chocolateSauce: 0.3,
    chocolateScoop: 1.0,
  };

  class IcecreamBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 2,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
        retrievedOrders: [],
    }

    componentDidMount () {
        axios.get( 'https://taskb4-cs3219.firebaseio.com/ingredients.json' )
            .then( response => {
                this.setState( { ingredients: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
        axios.get('https://taskb4-cs3219.firebaseio.com/orders.json')
            .then( response => {
                this.setState( { retrievedOrders: response.data } );
                console.log(response.data);
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState( updatedIngredients );
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState( updatedIngredients );
    }

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        this.setState( { loading: true } );
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false, purchasing: false } );
            } )
            .catch( error => {
                this.setState( { loading: false, purchasing: false } );
            } );
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let icecream = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.state.ingredients ) {
            icecream = (
                <Aux>
                    <Icecream ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {icecream}
            </Aux>
        );
    }
}

export default withErrorHandler( IcecreamBuilder, axios );