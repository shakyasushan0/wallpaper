import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {TickerContainer, Ticker} from '../styles/ExploreScreenStyle';
import {categories} from '../utilities/categories';
import {useTheme} from 'react-native-paper';
const TICKER_HEIGHT = 35;
const TickerComponent = ({scrollX, width}) => {
  const {colors} = useTheme();
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  return (
    <TickerContainer>
      <Animated.View style={{transform: [{translateY}]}}>
        {categories.map(({category}, index) => {
          return (
            <Ticker color={colors.text} key={index}>
              {category}
            </Ticker>
          );
        })}
      </Animated.View>
    </TickerContainer>
  );
};
export default TickerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
