import React from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {actionBar} from '../styles/WallpaperScreenStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFavorite} from '../context/FavoriteContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActionBar = ({bottom, colors, shareWallpaper, item, downloadImage}) => {
  const {
    favorites,
    changed,
    setChanged,
    addFavorites,
    removeFavorite,
  } = useFavorite();
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log('Done.');
  };

  return (
    <Animated.View
      style={[actionBar, {backgroundColor: colors.background, bottom}]}>
      <TouchableOpacity
        onPress={() => {
          favorites.includes(item) ? removeFavorite(item) : addFavorites(item);
          setChanged(!changed);
        }}>
        <Icon
          name={favorites.includes(item) ? 'favorite' : 'favorite-outline'}
          size={36}
          color={favorites.includes(item) ? 'red' : colors.text}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => shareWallpaper(item)}>
        <Icon name="share" size={36} color={colors.text} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => downloadImage(item)}>
        <Icon name="save" size={36} color={colors.text} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log(favorites)}>
        <Icon name="wallpaper" size={36} color={colors.text} />
      </TouchableOpacity>
    </Animated.View>
  );
};
export default ActionBar;
