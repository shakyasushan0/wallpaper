import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useTheme, Searchbar, Button} from 'react-native-paper';
import SearchLoading from './SearchLoadingScreen';
import {Container, Header} from '../styles/SearchScreenStyle';
import {unsplashApiKey} from '../utilities/keys';
import FastImage from 'react-native-fast-image';

const SearchScreen = (props) => {
  const {colors} = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [page, setPage] = useState(1);
  const searchWallpaper = () => {
    setLoading(true);
    setEndReached(false);
    if (query.length !== 0) {
      fetch(
        `https://api.unsplash.com/search/photos?query=${query.toLowerCase()}&page=${page}&client_id=${unsplashApiKey}`,
      )
        .then((res) => res.json())
        .then((result) => {
          const img = result.results.map((rslt) => rslt.urls.regular);
          setResults(img);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const renderWallpapers = ({item}) => {
    return (
      <View style={{flex: 1, margin: 5}}>
        <FastImage
          style={{width: '100%', height: 250, borderRadius: 15}}
          source={{uri: item, priority: FastImage.priority.normal}}
        />
      </View>
    );
  };
  return (
    <Container color={colors.background}>
      <Header>
        <Searchbar
          placeholder="Search ..."
          value={query}
          onChangeText={(text) => setQuery(text)}
          onSubmitEditing={searchWallpaper}
        />
      </Header>
      {loading && <SearchLoading />}
      {results && !loading && (
        <FlatList
          data={results}
          renderItem={renderWallpapers}
          numColumns={2}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={() => setEndReached(true)}
        />
      )}
      {endReached && <Button>Load More</Button>}
    </Container>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
