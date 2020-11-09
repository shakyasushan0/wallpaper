import React, {useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FavoriteContext = React.createContext();

export const useFavorite = () => {
  return useContext(FavoriteContext);
};

export const FavoriteProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) getFavorites();

    return () => (isSubscribed = false);
  }, [changed]);
  const getFavorites = async () => {
    const jsonValue = await AsyncStorage.getItem('@favorites');
    return jsonValue !== null ? setFavorites(JSON.parse(jsonValue)) : null;
  };

  const addFavorites = async (fav) => {
    await AsyncStorage.setItem(
      '@favorites',
      JSON.stringify([...favorites, fav]),
    );
    setFavorites([...favorites, fav]);
  };
  const removeFavorite = async (item) => {
    const index = favorites.indexOf(item);
    favorites.splice(index, 1);
    await AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
  };
  const value = {
    favorites,
    addFavorites,
    changed,
    setChanged,
    removeFavorite,
  };
  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
