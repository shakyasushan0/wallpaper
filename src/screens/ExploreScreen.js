import React from 'react';
import {FlatList} from 'react-native';
import {CategoryContainer, Container} from '../styles/ExploreScreenStyle';
import {useTheme, Card} from 'react-native-paper';
import Ticker from '../components/TickerComponent';
import CategoryComponent from '../components/CategoryComponent';
import {categories} from '../utilities/categories';

const ExploreScreen = (props) => {
  const {colors} = useTheme();
  return (
    <Container backgroundColor={colors.background}>
      <Ticker />
      <FlatList
        data={categories}
        renderItem={({item, index}) => (
          <CategoryComponent {...item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};
export default ExploreScreen;
