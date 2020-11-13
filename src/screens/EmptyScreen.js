import React from 'react';
import LottieView from 'lottie-react-native';
const EmptyScreen = (props) => (
  <LottieView
    source={require('../assets/lottie/8021-empty-and-lost.json')}
    autoPlay
    loop
  />
);
export default EmptyScreen;
