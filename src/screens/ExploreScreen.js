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
    const inputRangeOpacity = [
      (index - 0.5) * width,
      index * width,
      (index + 0.5) * width,
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });
    const opacity = scrollX.interpolate({
      inputRange: inputRangeOpacity,
      outputRange: [0, 1, 0],
    });
    return (
      <View style={[{width, height}, cardContainer]}>
        <Animated.View style={{transform: [{scale}], opacity}}>
          <Card>
            <Card.Title
              title={item.category}
              subtitle={
                'Style your device with beautiful' +
                item.category +
                'wallpapers'
              }
            />
            <Card.Cover source={item.img} />
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => props.navigation.navigate('wallpaper')}>
                View Wallpapers
              </Button>
            </Card.Actions>
          </Card>
        </Animated.View>
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
