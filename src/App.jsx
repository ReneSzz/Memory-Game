import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


 function App() {
 let [spriteBack, setSpriteBack] = useState('');
 let [name, setName] = useState('');
 

  async function getPokemon()
  {
    
     try{
     let response = await fetch(`https://pokeapi.co/api/v2/pokemon/charizard`);
     let result = await response.json();
     //console.log(result.sprites.back_default);
      setSpriteBack(result.sprites.front_default);
      setName(result.forms[0].name);

      console.log(spriteBack);
      console.log(name);

    
     }
     catch
     {
        title.innerText = "Error Invalid Location";
      
     }
     
  }
  
getPokemon();

  return (
    <>
     <img src={spriteBack}></img>
     <p>{name}</p>
    </>
  )
}

export default App
