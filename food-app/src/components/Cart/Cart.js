import React, { useState, useContext } from 'react';
import useHttp from '../../hooks/useHttp';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { sendRequest: sendPostRequest } = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  function cartItemRemoveHandler(id) {
    cartCtx.removeItem(id);
  }

  function cartItemAddHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  function handleOrder() {
    setIsCheckout(true);
  }

  function handleCancelCheckout() {
    setIsCheckout(false);
  }

  function transformData(customerData, data) {
    const generatedId = data.name;

    const transformedData = { id: generatedId, ...customerData, order: cartCtx.items };
  }

  const addOrder = async (customerData) => {
    setIsSubmitting(true);
    const transformedData = { customer: customerData, order: cartCtx.items }
    sendPostRequest({
      url: 'your_server_url',
      method: 'POST',
      body: transformedData,
      headers: {
        'Content-type': 'application/json'
      }
    }, transformData.bind(null, customerData));


    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {(!isSubmitting && !isSubmitted) && (
        <React.Fragment>
          <h3>Your Cart</h3>
          {hasItems ? cartItems : <p>No items in cart.</p>}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout && <Checkout onAddCustomer={addOrder} cancelCheckout={handleCancelCheckout} />}
          {!isCheckout && <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={handleOrder}>Order</button>}
          </div>}
        </React.Fragment>)}
      {isSubmitting && <p>Submitting order...</p>}
      {isSubmitted && <p>Order successfully submitted!</p>}
    </Modal>
  );
}

export default Cart;