import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const initialCartState = { items: [], totalQty: 0, changed: false };

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQty = action.payload.totalQty;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const itemToAdd = action.payload;

      state.totalQty++;
      state.changed = true;

      const existingItem = state.items.find(i => i.itemId === itemToAdd.id);
      if (!existingItem) {
        state.items.push({
          itemId: itemToAdd.id,
          price: itemToAdd.price,
          qty: 1,
          totalPrice: itemToAdd.price,
          name: itemToAdd.title
        });
      } else {
        existingItem.qty++;
        existingItem.totalPrice = existingItem.totalPrice + itemToAdd.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;

      state.totalQty--;
      state.changed = true;
      
      const existingItem = state.items.find(i => i.itemId === id);
      if (existingItem.qty === 1) {
        state.items = state.items.filter(i => i.itemId !== id);
      } else {
        existingItem.qty--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    }
  }
});

export function fetchCartData() {
  return async (dispatch) => {
    async function fetchData() {
      const response = await fetch('your_db_url_here');

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();
      return data;
    }

    try {
      const cartData = await fetchData();
      dispatch(cartSlice.actions.replaceCart({
        items: cartData.items || [],
        totalQty: cartData.totalQty
      }));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  }
}

export function sendCartData(cart) {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data...',
      })
    );

    async function sendRequest() {
      const response = await fetch('your_db_url_here', {
        method: 'PUT',
        body: JSON.stringify({
          items: cart.items,
          totalQty: cart.totalQty
        })
      });

      if (!response.ok) {
        throw new Error('Cart could not update.');
      }
    }

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
}

export const cartActions = cartSlice.actions;
export default cartSlice;