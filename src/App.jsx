import React, { useEffect } from 'react';
import NavBar from './componentes/NavBar';
import Pokedex from './componentes/Pokedex';
import SearchBar from './componentes/SearchBar';
import { getPokemonData, getPokemons, searchPokemon } from './api';
import { FavoriteProvider } from './context/FavoritesContext';

const {useState} = React;

const localStorageKey= 'favorite_pokemon'

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [searching, setSearching] = useState(false)

  const fetchPokemons = async ()=>{
    try {
      setLoading(true);
      const data = await getPokemons(25, 25 * page)
      const promises = data.results.map( async (pokemon)=>{
      return await getPokemonData(pokemon.url)
      })
      const results = await  Promise.all(promises)
      setPokemons(results)
      setLoading(false)
      setTotal(Math.ceil (data.count / 25))
      setNotFound(false)
    } catch (error) {
      
    }
    
    const loadFavoritePokemons=()=>{
      const pokemons =  JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
      setFavorites(pokemons);
    }

    useEffect(()=>{
      loadFavoritePokemons
    },[])

  }
  useEffect(()=>{
    if (!searching) {
      fetchPokemons()
    }
  }, [page])

  const updateFavoritePokemons= (name) =>{
    const updated = [...favorites]
    const isFavorite = favorites.indexOf(name)
    if(isFavorite>=0){
      updated.splice(isFavorite)
    }else{
      updated.push(name);
    }
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated))
  }

  const onSearch = async(pokemon)=>{
    setLoading(true)
    const result = await searchPokemon(pokemon)
    if (!pokemon) {
      return fetchPokemons();
    }
    setNotFound(false)
    setSearching(true)
    if (!result) {
      setNotFound(true);
      setLoading(false);
      return
    } else {
      setPokemons([result])
    }
    setLoading(false)
    setSearching(false)
    setPage(0)
    setTotal(1)
  }

  return ( 
  <FavoriteProvider
    value={{favoritePokemons: favorites,
    updateFavoritePokemons: updateFavoritePokemons
    }}
    >
      <div>
        <NavBar/>
        <SearchBar onSearch={onSearch}/>
        {
          notFound ? (
          <div className='not-found-text'>Pokemon no encontrado</div>):(
          
        <Pokedex 
         loading={loading}
         pokemons={pokemons}
          page={page}
         setPage={setPage}
         total={total}
       />)}
      </div>;
  </FavoriteProvider>)
};

export default App;
