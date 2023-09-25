import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


 function App() {
 let [index, setindex] = useState(0);
 let [pokemonArray, setPokemonArray] = useState([]);
 let [pokemon, setPokemon] = useState(null);
 const [show,setShow] = useState(false);
 const [start, setStart] = useState(false);
 let [score, setScore] = useState(0);
 let [highScore, setHighScore] = useState(0);


function AddProperties(array)
{
    array.map((pokemon) => 
  {
    pokemon.isClicked = false; 
         
    pokemon.click = () => {
     if(pokemon.isClicked===true)
      {
        setShow(true);
        setScore(0);
      }
     else if(pokemon.isClicked===false) 
     {
      setScore(++score);
       pokemon.isClicked = true;
       ShuffleArray();
     }
     }
  })
}


 function Pokemon({array, props }) {
  return( 
    <> 
  
    
      { array.map((pokemon) =>{
        if (array.length === 8 && start === false) {
          AddProperties(pokemonArray);
          setStart(true);
      
        }
        return (

         
        !show && <div onClick={() => pokemon.click()} className='card'>
        <img src={pokemon.sprites.front_default}></img>
        </div>
         )
       
      } 
      ) }   
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
  setStart(false);
  for(let i = 1; i < 9; i++)
  {

    let randomId = Math.floor(Math.random() * 151 - 1 + 1)
    getPokemon(randomId).then(json => setPokemonArray(prevState => ([...prevState, json])));   

  }
  getPokemon(6).then(json => setPokemon(json));
}

function ShuffleArray()
{
 if(score>highScore) setHighScore(score);
const tempArray = pokemonArray.map(pokemon => ({...pokemon}));
  for (let i = tempArray.length - 1; i > 0 ; i--)
  {
    const j = Math.floor(Math.random()* (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  setPokemonArray(tempArray);

}


useEffect(() => {
  const timer = setTimeout(() => {
    fillArray()
  }, 100);
  return () => clearTimeout(timer);
}, []);


  return (
  <>
   <h1>Current Score: {score}</h1>
   <h2>High Score : {highScore}</h2>

<div id='container'>
  
    {pokemon ? (
      <Pokemon array={pokemonArray}/>
    ) : (
      <div>no pokemon for {index}</div>
    )}
</div>


    <button type="button" onClick={() =>{
       fillArray();
       setScore(0);}
       }> Reset  Game </button>
</>
);
}

export default App
