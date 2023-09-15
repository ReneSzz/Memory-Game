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
 let [pokemon, setPokemon] = useState({spriteBack: '', pokemonName:''});
 const [results, setResults] = useState([]);
 const controller = new AbortController;
 

 function Pokemon({ name,sprite, props }) {
  return <> 
  
<h1 {...props}>{name}</h1>;
<img src={sprite}></img>

</>
}




   async function getPokemon()
   {
     
      let response = await fetch(URL);
      if (response.ok){
        return await response.json();
      } else {
        return Promise.reject();
      }
    
  }

 
useEffect(() => {
getPokemon().then(json => setPokemon(json));
});

  // setResults(result);
  // setSpriteBack(result.sprites.front_default);
  // setName(result.forms[0].name);
  // setPokemon({spriteBack,name})

  return (
    <>
    <div>
      <button type="button" onClick={()=> setIndex(index + 1)}> Next </button>

      {pokemon ? (
        <Pokemon name={pokemon.name} sprite={pokemon.sprites.front_default} />
      ) : (

        <div> no pokemon for {index}</div>
      )}
    </div>
   
    </>
  )
}

export default App
