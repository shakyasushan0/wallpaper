import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme, Searchbar} from 'react-native-paper';
import SearchLoading from './SearchLoadingScreen';
import {Container, Header} from '../styles/SearchScreenStyle';

const SearchScreen = (props) => {
  const {colors} = useTheme();
  const [query, setQuery] = useState('');
  return (
    <Container color={colors.background}>
      <Header>
        <Searchbar
          placeholder="Search ..."
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
      </Header>
    </Container>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
