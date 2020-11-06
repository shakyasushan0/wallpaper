import React from 'react';
import {Dimensions} from 'react-native';
import {
  Container,
  explore,
  Background,
  Explore,
  ImageContainer,
  Favorite,
  favorite,
  GreetingContainer,
  Welcome,
  Description,
} from '../styles/LandingScreenStyle';
import {Button} from 'react-native-paper';

const {width, height} = Dimensions.get('window');
const LandingScreen = (props) => (
  <Container>
    <ImageContainer width={width} height={height}>
      <Background source={require('../assets/images/landing.jpg')} />
    </ImageContainer>
    <GreetingContainer>
      <Welcome>WELCOME</Welcome>
      <Description>Beautiful wallpapers for you !</Description>
    </GreetingContainer>
    <Explore>
      <Button
        mode="contained"
        style={explore}
        color="#0A79DF"
        icon="camera"
        onPress={() => props.navigation.navigate('explore')}>
        Explore
      </Button>
    </Explore>
    <Favorite>
      <Button
        mode="contained"
        style={favorite}
        color="#E83350"
        icon="heart"
        onPress={() => props.navigation.navigate('tab')}>
        Favorites
      </Button>
    </Favorite>
  </Container>
);
export default LandingScreen;
