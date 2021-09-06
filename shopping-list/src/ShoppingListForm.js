import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './ShoppingListForm.css';

function ShoppingListForm(props) {
	const [name, setName] = useState('');
	const [qty, setQty] = useState('');
	const [isEmpty, setIsEmpty] = useState(true);

	function handleNameChange(e) {
		setIsEmpty(false);
		setName(e.target.value);
		console.log(name);
	}

	function handleQtyChange(e) {
		setQty(e.target.value);
		console.log(qty);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const itemToAdd = {
			itemName: name,
			id: uuid(),
			qty: qty,
			purchased: false
		};
		props.addItem(itemToAdd);

		setName('');
		setQty('');
		setIsEmpty(true);
	}

	return (
		<form className="ShoppingListForm" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Item name: </label>
				<input id="name" type="text" value={name} onChange={handleNameChange} />
			</div>
			<div>
				<label htmlFor="qty">Quantity: </label>
				<input id="qty" type="text" value={qty} onChange={handleQtyChange} placeholder="Optional" />
				<button className="ShoppingListForm-btn" type="submit" disabled={isEmpty}>Add to list</button>
			</div>
		</form>
	);
}

export default ShoppingListForm;