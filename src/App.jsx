import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


 function App() {
let [index, setIndex] = useState(0);
const URL = `https://pokeapi.co/api/v2/pokemon/3`
 let [pokemonArray, setPokemonArray] = useState([]);
 let [pokemon, setPokemon] = useState(null);
 const [results, setResults] = useState([]);
 const [show,setShow] = useState(false);
 let shuffleArray = [];


function AddProperties(array)
{

  array.map((pokemon) => 
  {
    pokemon.isClicked = false; 
         
    pokemon.click = () => {
     if(pokemon.isClicked===true) setShow(true);
     else if(pokemon.isClicked===false) 
     {
       pokemon.isClicked = true;
       ShuffleArray();
     }
     }
  })
 
}


 function Pokemon({array, props }) {
  
  
  
  return( 
    <> 
      {array.map((pokemon) =>{
        
        return (
          
        
          // Next step needed is to create new pokemon objects with contain just the sprite and a property that changes based on if theirs has been clicked or not.
          !show && <div onClick={() => pokemon.click()} className='card'>

      
       
        
        <img src={pokemon.sprites.front_default}></img>
        </div>
         )
       
      }
      )}
    
    </>
      );
}


   async function getPokemon(id)
   {
     
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/`+ id);
      if (response.ok){
        return await response.json();
      } else {
        return Promise.reject();
      }
  }

function fillArray(){ 
  
  setPokemonArray([]);
  setShow(false);
  for(let i = 1; i < 9; i++)
  {

    let randomId = Math.floor(Math.random() * 151 - 1 + 1)
    getPokemon(randomId).then(json => setPokemonArray(prevState => ([...prevState, json])));   

  }
  getPokemon(6).then(json => setPokemon(json));

}

function ShuffleArray()
{
 
const tempArray = pokemonArray.map(pokemon => ({...pokemon}));
  for (let i = tempArray.length - 1; i > 0 ; i--)
  {
    const j = Math.floor(Math.random()* (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  setPokemonArray(tempArray);
  console.log(pokemonArray);

}


  return (
  <>
   

<div id='container'>
    {pokemon ? (
      <Pokemon array={pokemonArray}/>
    ) : (
      <div>no pokemon for {index}</div>
    )}
</div>

<button type="button" onClick={() => AddProperties(pokemonArray)}>
      Next
    </button>
    <button type="button" onClick={() => {
    fillArray() 
  }}>
      fill
    </button>
</>
);
}

export default App
