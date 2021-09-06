import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const qty = useSelector(state => state.cart.totalQty);

  function toggleCart() {
    dispatch(uiActions.toggleCart());
  }

  return (
    <button onClick={toggleCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{qty}</span>
    </button>
  );
};

export default CartButton;
