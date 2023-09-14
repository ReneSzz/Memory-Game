import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




 function App() {
 let [spriteBack, setSpriteBack] = useState('');
 let [name, setName] = useState('');
 let [pokemonArray, setPokemonArray] = useState([]);
 let [pokemon, setPokemon] = useState({spriteBack: '', pokemonName:''});
 



 
  async function getPokemon()
  {
    
     try{
     let response = await fetch(`https://pokeapi.co/api/v2/pokemon/3`);
     let result = await response.json();
      setSpriteBack(result.sprites.front_default);
      setName(result.forms[0].name);
      setPokemon({spriteBack,name});
     }
     catch
     {
        console.log("error");
      
     }
     
  }
  

  function displayArray()
  {
    console.log(pokemonArray);

  }
getPokemon();

  return (
    <>
    <div className='card'>
    <img src={pokemonArray[0]}></img>
    <button onClick={displayArray}></button>
   
    </div>
    </>
  )
}

export default App
