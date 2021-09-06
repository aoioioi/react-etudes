import Pokecard from './Pokecard';
import './Pokedex.css';

function Pokedex(props) {
  const pokeData = props.pokeData;
  let totalExp = pokeData.reduce((exp, p) => exp + p.base_experience, 0);
  let title;

  if (props.exp < 1000) {
    if (props.isWinner) {
      title = <h1 className="Pokedex-winner">Winning Hand</h1>
    } else {
      title = <h1 className="Pokedex-loser">Losing Hand</h1>
    }
  }

  return (
    <div className="Pokedex">
      <h2 style={{ textAlign: 'center' }}>Pokedex</h2>
      <h4 style={{ textAlign: 'center' }}>Total Experience: {props.exp || totalExp}</h4>
      {title}
      <div className="Pokedex-cards">
        {pokeData.map(p => (
          <Pokecard id={p.id} name={p.name} type={p.type} exp={p.base_experience} />))
        }
      </div>
    </div>
  );
}

export default Pokedex;