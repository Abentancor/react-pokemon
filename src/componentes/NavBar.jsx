import React from 'react';
import FavoriteContext from '../context/FavoritesContext';

const {useContext} = React;

const NavBar = () => {

    const {favoritePokemons} = useContext(FavoriteContext);

    let imgUrl="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

  return <nav>
      <div>
        <img src={imgUrl} alt="PokeApi-logo" className='navbar-image'/>
      </div>
      <div>❤️ {favoritePokemons.length}</div>
  </nav>;
};

export default NavBar;
