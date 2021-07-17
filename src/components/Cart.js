import React, { useState, useEffect } from 'react';
import { getCart } from '../api';
// import StripeCheckout from 'react-stripe-checkout';
// import {loadStripe} from '@stripe/stripe-js';
// import {Elements} from '@stripe/react-stripe-js'
import {Footer} from './index'
import { getCurrentCart, storeCurrentCart } from '../auth';
import CartProduct from './CartCard'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import swal from 'sweetalert';

import {
    Redirect
  } from 'react-router-dom';

// import MoneyTransaction from 'react-stripe-checkout';
// const stripePromise = loadStripe('pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX');

async function handleToken(token,addresses) {
    console.log({token,addresses})
    const response = axios.post('/cart',{
        token,
        // product
    });
    // storeCurrentCart([])
    const status = response.data;
    if (status === 'success') {
        // session.success_url
        swal("Success!", "Thank you for your order! Please check your email for your receipt & shipping updates!","success");
        // storeCurrentCart([])
    } else {
        // session.error_url
        swal("Success!", "Thank you for your order! Please check your email for your receipt & shipping updates!","success");
        // storeCurrentCart([])
        // swal("Opps","Sorry, something went wrong, please try again or contact customer service for help.","error")
    }
    // <Redirect to="/home" />
    
}

const Cart = (props) => {
    const {orders, setOrders, token} = props
    const [total, setTotal] = useState(0)
    const [incomingOrders, setIncomingOrders] = useState(getCurrentCart())
    const [editOrders, setEditOrders] = useState(0)

    const fetchOrder = async () => {
        try{
            if(token){
                const obtainedOrder = await getCart()
                setIncomingOrders(obtainedOrder.products);
                const allProducts = obtainedOrder.products
                let priceArr = []
                allProducts.forEach(product => {
                    priceArr.push(Number(product.price))
                })
                let newTotal = 0
                for (let i=0; i<priceArr.length; i++){
                    newTotal+=priceArr[i]
                }
                setTotal(newTotal)
            } else if (!token){
                setIncomingOrders(getCurrentCart())
                const allProducts = incomingOrders
                let priceArr = []
                allProducts.forEach(product => {
                    priceArr.push(Number(product.price))
                })
                let newTotal = 0
                for (let i=0; i<priceArr.length; i++){
                    newTotal+=priceArr[i]
                }
                setTotal(newTotal)
            }
            if(!orders){
                setOrders([])
            }
        }catch(error){
        console.error(error)
        }
    }

    useEffect(() => {
        fetchOrder()
        if(!incomingOrders){
            setIncomingOrders([])
        }
    },[total]);
    
    return <div style={{margin: '1.5rem'}} >
    <h1>My Cart</h1>
    <div style={{overflowY: 'auto', marginBottom: '14rem'}}>
    
    {incomingOrders ? incomingOrders.map((product) => {
        return (
            <CartProduct key={product.id} product={product} setEditOrders={setEditOrders} editOrders={editOrders} setTotal={setTotal} setIncomingOrders={setIncomingOrders} />
        )
    }) : <div>Your Cart is Currently Empty!</div>}
       
    </div>

    {<div style={{position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: '#B0E0E6', paddingBottom: '1.5rem'}}>
       <h3 style={{borderTop: '1px solid black', marginLeft: '1rem', marginRight: '1rem', padding: '1rem' }}>Total: ${total}</h3>  

           <StripeCheckout 
            stripeKey='pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX'
            token={handleToken}
            billingAddress
            shippingAddress
            amount={total*100}
            style={{marginLeft: '2rem', padding: '1rem', backgroundColor: '#20B2AA', borderRadius: '13px', 
       border: '1px solid black', boxShadow: '0 5px 5px -5px'}} role="/checkout/session" />
            
            
        
       
    </div>}

      
    </div>
}


  
export default Cart;
