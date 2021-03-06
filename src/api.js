export const searchPokemon = async (pokemon) => {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
      } catch (error) {}
    };

    export const getPokemons = async (limit = 25, offset= 0)=>{
      try {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
      } catch (error) {}
    };
    
    export const getPokemonData = async (url) =>{
      try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
      } catch (error) {
        
      }
    }