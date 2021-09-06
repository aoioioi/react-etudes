import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css';

function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  function addToCartHandler(amount) {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  }

  return (
    <li className={classes.meal}>
      <div>
        <h4>{props.name}</h4>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
}

export default MealItem;