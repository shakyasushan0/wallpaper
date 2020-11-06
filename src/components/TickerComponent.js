import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TickerContainer, Ticker} from '../styles/ExploreScreenStyle';
import {categories} from '../utilities/categories';
import {useTheme} from 'react-native-paper';

const TickerComponent = () => {
  const {colors} = useTheme();
  return (
    <TickerContainer>
      <View>
        {categories.map(({category}, index) => {
          return (
            <Ticker color={colors.text} key={index}>
              {category}
            </Ticker>
          );
        })}
      </View>
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
