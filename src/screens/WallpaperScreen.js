import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {categories} from '../utilities/categories';
import {
  Container,
  wallpaperContainer,
  wallpaper,
  actionBar,
} from '../styles/WallpaperScreenStyle';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WallpaperScreen = (props) => {
  const {colors} = useTheme();
  const [isImageFocused, setisImageFocused] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const bottom = scale.interpolate({
    inputRange: [0.9, 1],
    outputRange: [0, -80],
  });
  useEffect(() => {
    if (isImageFocused) {
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
  }, [isImageFocused]);
  const showActionBar = () => {
    setisImageFocused(!isImageFocused);
  };
  const renderWallpapers = ({item, index}) => {
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => showActionBar()}>
          <Animated.View style={{flex: 1, transform: [{scale}]}}>
            <View style={wallpaperContainer}>
              <Image source={item.img} style={wallpaper} />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[actionBar, {backgroundColor: colors.background, bottom}]}>
          <TouchableOpacity>
            <Icon name="favorite" size={36} color="red" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="share" size={36} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="save" size={36} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="wallpaper" size={36} color={colors.text} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };
  return (
    <Container color={colors.background}>
      <FlatList
        scrollEnabled={!isImageFocused}
        horizontal
        pagingEnabled
        data={categories}
        renderItem={renderWallpapers}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      />
    </Container>
  );
};
export default WallpaperScreen;
