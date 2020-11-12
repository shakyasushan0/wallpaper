import React, {useContext} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Switch, useTheme} from 'react-native-paper';
import {ThemeContext} from '../context/ThemeContext';
import {Container, Header, ThemeText} from '../styles/FavoriteScreenStyle';
import FastImage from 'react-native-fast-image';
import {useFavorite} from '../context/FavoriteContext';

const FavoriteScreen = (props) => {
  const {darkTheme, setDarkTheme} = useContext(ThemeContext);
  const {colors} = useTheme();
  const {favorites} = useFavorite();

  const renderFavorites = ({item}) => {
    return (
      <View style={{flex: 1, margin: 5}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('single', {img: item})}>
          <FastImage
            style={{width: '100%', height: 250, borderRadius: 15}}
            source={{uri: item, priority: FastImage.priority.normal}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Container color={colors.background}>
      <Header>
        <ThemeText>Dark Theme</ThemeText>
        <Switch
          value={darkTheme}
          onValueChange={() => setDarkTheme(!darkTheme)}
        />
      </Header>
      <FlatList
        data={favorites}
        renderItem={renderFavorites}
        numColumns={2}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};
export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
});
