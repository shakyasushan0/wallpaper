import React from 'react';
import {} from 'react-native';
import LottieView from 'lottie-react-native';
const Loading = (props) => (
  <LottieView
    source={require('../assets/lottie/9844-loading-40-paperplane.json')}
    autoPlay
    loop
  />
);
export default Loading;
