import { Fragment } from "react";
import './Pokecard.css';

const pokeAPI = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';

// slice from back
let padToThree = (num) => (num <= 999 ? `00${num}`.slice(-3) : num);

function Pokecard(props) {
	const pokeImg = `${pokeAPI}${padToThree(props.id)}.png`;

	return (
		<Fragment>
			<div className="Pokecard">
				<div>
					<h3 className="Pokecard-title">{props.name}</h3>
					<div className="Pokecard-image">
						<img src={pokeImg} alt={props.name} />
					</div>
					<p className="Pokecard-data">Type: <span className="Pokecard-type">{props.type}</span></p>
					<p className="Pokecard-data">EXP: {props.exp}</p>
				</div>
			</div>
		</Fragment>
	);
}

export default Pokecard;