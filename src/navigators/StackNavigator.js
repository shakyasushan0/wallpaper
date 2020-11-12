import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import LandingScreen from '../screens/LandingScreen';
import ExploreScreen from '../screens/ExploreScreen';
import WallpaperScreen from '../screens/WallpaperScreen';
import SingleWallpaperScreen from '../screens/SingleWallpaperScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator headerMode={'none'} initialRouteName="landing">
      <Stack.Screen name="landing" component={LandingScreen} />
      <Stack.Screen name="explore" component={ExploreScreen} />
      <Stack.Screen name="wallpaper" component={WallpaperScreen} />
      <Stack.Screen name="tab" component={TabNavigator} />
      <Stack.Screen name="single" component={SingleWallpaperScreen} />
    </Stack.Navigator>
  );
};
export default MainStack;
