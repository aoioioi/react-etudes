import React from "react";
import Pokedex from "./Pokedex";
import Pokegame from "./Pokegame";

const DUMMY_DATA = [
  {id: 50, name: 'Diglett', type: 'ground', base_experience: 62},
  {id: 7, name: 'Squirtle', type: 'water', base_experience: 63},
  {id: 3, name: 'Venusaur', type: 'grass', base_experience: 182},
  {id: 17, name: 'Pidgeotto', type: 'flying', base_experience: 148},
  {id: 25, name: 'Pikachu', type: 'electric', base_experience: 250},
  {id: 143, name: 'Snorlax', type: 'normal', base_experience: 105},
  {id: 93, name: 'Haunter', type: 'poison', base_experience: 125},
  {id: 133, name: 'Eevee', type: 'normal', base_experience: 65}
]

function App() {
  return (
    <div className="App">
      <Pokedex pokeData={DUMMY_DATA} />
      <Pokegame pokeData={DUMMY_DATA} />
    </div>
  );
}

export default App;
