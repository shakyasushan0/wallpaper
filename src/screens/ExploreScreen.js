import React from 'react';
import {FlatList, Dimensions, View} from 'react-native';
import {Container, cardContainer} from '../styles/ExploreScreenStyle';
import {useTheme, Card, Button} from 'react-native-paper';
import Ticker from '../components/TickerComponent';

import {categories} from '../utilities/categories';

const {width, height} = Dimensions.get('window');
const ExploreScreen = (props) => {
  const {colors} = useTheme();
  const renderCard = ({item}) => (
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
  return (
    <Container backgroundColor={colors.background}>
      <Ticker />
      <FlatList
        data={categories}
        renderItem={renderCard}
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
