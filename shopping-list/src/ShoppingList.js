import React, { useState } from 'react';
import ShoppingListForm from './ShoppingListForm';
import ShoppingItem from './ShoppingItem';
import StapleItem from './StapleItem';
import { v4 as uuid } from 'uuid';
import './ShoppingList.css';

function ShoppingList(props) {
	const [shoppingList, setShoppingList] = useState([]);
	const [staplesList, setStaplesList] = useState([]);

	function add(item) {
		item['id'] = uuid();
		console.log('Item to add', item);
		console.log('Current item list', shoppingList);
		setShoppingList(curList => {
			console.log('Cur', curList);
			return [...curList, item];
		});
		console.log('Updated list (output is one step behind)', shoppingList);
	}

	function remove(id) {
		setShoppingList(shoppingList.filter(i => i.id !== id));
	}

	function update(id, itemToUpdate) {
		const updatedList = shoppingList.map(item => {
			console.log(itemToUpdate)
			if (item.id === id) {
				return { ...item, itemName: itemToUpdate.itemName, qty: itemToUpdate.qty }
			}
			return item;
		});
		setShoppingList(updatedList);
	}

	function togglePurchased(id) {
		const updatedList = shoppingList.map(item => {
			if (item.id === id) {
				return { ...item, purchased: !item.purchased };
			}
			return item;
		});
		setShoppingList(updatedList);
	}

	function addStaple(item) {
		console.log('Add staple id', item.itemName, item.id)
		if (item.id in staplesList)
			setStaplesList(myCurStaples => {
				return [...myCurStaples, item];
			});
	}

	function removeStaple(id) {
		setStaplesList(staplesList.filter(s => s.id !== id))
	}

	return (
		<div className="ShoppingList">
			<h1>Shopping List <span>React App</span></h1>
			<ul className="ShoppingList-ul">
				{shoppingList.map(item => (
					<ShoppingItem
						key={item.id}
						id={item.id}
						itemName={item.itemName}
						qty={item.qty}
						purchased={item.purchased}
						removeItem={() => remove(item.id)}
						updateItem={update}
						togglePurchase={togglePurchased}
						addToStaple={() => addStaple(item)}
					/>
				))}
			</ul>
			<ul className="ShoppingList-ul">
				{staplesList.length !== 0 && <h3>Household Staples</h3>}
				{staplesList.map(s => (
					<StapleItem
						key={s.id}
						id={s.id}
						itemName={s.itemName}
					/>))}
			</ul>
			<ShoppingListForm addItem={add} />
		</div>
	);
}

export default ShoppingList;