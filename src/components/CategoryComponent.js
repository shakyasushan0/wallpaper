import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {CategoryContainer} from '../styles/ExploreScreenStyle';
import {Card, Button} from 'react-native-paper';
const {width, height} = Dimensions.get('window');
const CategoryComponent = ({category, img, index}) => (
  <CategoryContainer width={width} height={height}>
    <Card>
      <Card.Title
        title={category}
        subtitle={'Style your device with beautiful' + category + 'wallpapers'}
        //left={LeftContent}
      />
      <Card.Cover source={img} />
      <Card.Actions>
        <Button mode="contained">View Wallpapers</Button>
      </Card.Actions>
    </Card>
  </CategoryContainer>
);
export default CategoryComponent;
