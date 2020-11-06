import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Screens
import FavoriteScreen from '../screens/FavoriteScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createMaterialBottomTabNavigator();
const FavoriteTab = (props) => (
  <Tab.Navigator shifting={true}>
    <Tab.Screen
      name="favorite"
      component={FavoriteScreen}
      options={{
        tabBarLabel: 'Favorites',
        tabBarIcon: ({color, focused}) => (
          <Icon
            name={focused ? 'favorite' : 'favorite-outline'}
            size={24}
            color={focused ? 'white' : 'black'}
          />
        ),
        tabBarColor: '#E71C23',
      }}
    />
    <Tab.Screen
      name="search"
      component={SearchScreen}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({color, focused}) => (
          <Icon
            name={focused ? 'search' : 'search-off'}
            size={24}
            color={focused ? 'white' : 'black'}
          />
        ),
        tabBarColor: '#2ecc72',
      }}
    />
  </Tab.Navigator>
);
export default FavoriteTab;
