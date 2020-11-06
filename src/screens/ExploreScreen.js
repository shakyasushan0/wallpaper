import React, {useRef} from 'react';
import {FlatList, Dimensions, View, Animated} from 'react-native';
import {Container, cardContainer} from '../styles/ExploreScreenStyle';
import {useTheme, Card, Button} from 'react-native-paper';
import Ticker from '../components/TickerComponent';

import {categories} from '../utilities/categories';

const {width, height} = Dimensions.get('window');
const ExploreScreen = (props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const {colors} = useTheme();
  const renderCard = ({item, index}) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    return (
      <View style={[{width, height}, cardContainer]}>
        <Card>
          <Card.Title
            title={item.category}
            subtitle={
              'Style your device with beautiful' + item.category + 'wallpapers'
            }
          />
          <Card.Cover source={item.img} />
          <Card.Actions>
            <Button mode="contained">View Wallpapers</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  };
  return (
    <Container backgroundColor={colors.background}>
      <Ticker scrollX={scrollX} width={width} />
      <Animated.FlatList
        data={categories}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
      />
    </Container>
  );
};
export default ExploreScreen;
