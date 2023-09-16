import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


 function App() {
  let [index, setIndex] = useState(0);
const URL = `https://pokeapi.co/api/v2/pokemon/3`
 let [spriteBack, setSpriteBack] = useState('');
 let [name, setName] = useState('');
 let [pokemonArray, setPokemonArray] = useState([]);
 let [pokemon, setPokemon] = useState(null);
 const [results, setResults] = useState([]);
 const controller = new AbortController;
 

function PokemonBuilder(name,id,sprite, props)
{
  return <> 
   <h1 {...props}>{name}</h1>
<h2> {id}</h2>
<img src={sprite}></img> 
  </>
}

 function Pokemon({array, props }) {

  // array.map((pokemon) => {
  //   console.log(pokemon)
  //   console.log(pokemon.id)
    
    
  // })
  return( 
    <> 
    
    <h1>{pokemon.name}</h1>
    <img src={pokemon.sprites.front_default}></img>
    
    </>
      );
}


   async function getPokemon(id = 4)
   {
     
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/`+ id);
      if (response.ok){
        return await response.json();
      } else {
        return Promise.reject();
      }
  }

function fillArray(){ 
  
  getPokemon().then(json => setPokemonArray(prevState => ([...prevState, json])));   
  getPokemon(5).then(json => setPokemonArray(prevState => ([...prevState, json])));  
  getPokemon(6).then(json => setPokemonArray(prevState => ([...prevState, json])));  
  getPokemon(6).then(json => setPokemon(json));
 

}





  return (
    <div>
    <button type="button" onClick={() => console.log(pokemonArray)}>
      Next
    </button>
    <button type="button" onClick={() => fillArray()}>
      fill
    </button>

    {pokemon ? (
      <Pokemon array={pokemonArray}/>
    ) : (
      <div>no pokemon for {index}</div>
    )}
  </div>
);
}

export default App
