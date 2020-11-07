import React from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {actionBar} from '../styles/WallpaperScreenStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActionBar = ({bottom, colors, shareWallpaper, item}) => (
  <Animated.View
    style={[actionBar, {backgroundColor: colors.background, bottom}]}>
    <TouchableOpacity>
      <Icon name="favorite" size={36} color="red" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => shareWallpaper(item)}>
      <Icon name="share" size={36} color={colors.text} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Icon name="save" size={36} color={colors.text} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Icon name="wallpaper" size={36} color={colors.text} />
    </TouchableOpacity>
  </Animated.View>
);
export default ActionBar;
