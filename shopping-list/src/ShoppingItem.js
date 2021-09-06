import React, { useState } from 'react';
import './ShoppingItem.css';

function ShoppingItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(props.itemName);
  const [updatedQty, setUpdatedQty] = useState(props.qty);

  function handleRemove() {
    props.removeItem(props.id);
  }

  function handleNameEdit(e) {
    setUpdatedName(e.target.value);
  }

  function handleQtyEdit(e) {
    setUpdatedQty(e.target.value);
  }

  function toggleEdit() { setIsEditing(!isEditing); }

  function togglePurchased(e) {
    props.togglePurchase(props.id);
  }

  function handleUpdate(e) {
    e.preventDefault();
    const updatedItem = {
      itemName: updatedName,
      qty: updatedQty
    }
    console.log(updatedName, e);
    props.updateItem(props.id, updatedItem);
    setIsEditing(false);
  }

  return (
    <div>
      {isEditing ? (
        <div className="ShoppingItem">
          <form className="Item-edit-form" onSubmit={handleUpdate}>
            <input type="text" value={updatedName} onChange={handleNameEdit} placeholder="Item name" />
            <input type="text" value={updatedQty} onChange={handleQtyEdit} placeholder="Quantity (Optional)" />
            <button>Save</button>
          </form>
        </div>) : (
        <div className="ShoppingItem">
          <li
            className={props.purchased && 'ShoppingItem purchased'}
            onClick={togglePurchased}
          >
            {props.qty !== '' && <span>{props.qty} - </span>}
            <span>{props.itemName}</span>
          </li>
          <div className="Item-buttons">
            <button onClick={toggleEdit}>Edit</button>
            <button onClick={handleRemove}>Remove</button>
          </div>
        </div>)
      }
    </div>
  );
}

export default ShoppingItem;