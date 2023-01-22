import { useState, useEffect } from 'react'
import {BoxPokemon} from './components/index'
import './style.css'

function App() {

  const [data, setData] = useState(null);
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState([])
  
  useEffect(()=>{

    fetch('https://pokeapi.co/api/v2/pokemon/').then(response => response.json()).then(r => setData(r.results))
    
  }, [])

  useEffect(()=>{
    if(data) return compilationData()
  }, [data])

  const compilationData = ()=>{

    data.map(item => {
      // console.log(item.url)
    })

  }

  const removePokemon = (e)=>{

    if(confirm(`Remover ${e}?`)){
      setData(prev =>{
        const arr = [...prev];
         let newArr = arr.filter(item => !item.name.includes(e))
         return newArr;
      })
    }

  }

  const handleFilter = (e)=>{
    setFilter(e.toLowerCase())
  }

  return (
    <div className="App">
      <input type="text" placeholder="Filtrar..." value={filter} onChange={(e)=> handleFilter(e.target.value)}/>
      {
        filter!=''?
        <div className="screen-pokemons">
        {data.filter(item => item.name.includes(filter)).map(poke => <BoxPokemon key={poke.name} name={poke.name} link={poke.url}/>)}
        </div>
        :

        (data ? 
        <div className="screen-pokemons">
          
        {data.map(item => <BoxPokemon key={item.name} name={item.name} link={item.url} remove={(e)=>removePokemon(e)}/>)}
        </div>
        :
        <h4>Aguardando dados...</h4>)
      }
      
    </div>
  )
}

export default App
