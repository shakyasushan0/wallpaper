import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Share,
} from 'react-native';

import {
  Container,
  wallpaperContainer,
  wallpaper,
} from '../styles/WallpaperScreenStyle';
import {useTheme} from 'react-native-paper';
import ActionBar from '../components/ActionBar';
import {unsplashApiKey} from '../utilities/keys';
import Loading from './LoadingScreen';

const WallpaperScreen = ({route}) => {
  const {colors} = useTheme();
  const {slug} = route.params;
  const [isImageFocused, setisImageFocused] = useState(false);
  const [page, setPage] = useState(1);
  const scale = useRef(new Animated.Value(1)).current;
  const bottom = scale.interpolate({
    inputRange: [0.9, 1],
    outputRange: [0, -80],
  });

  const [data, setData] = useState([]);
  useEffect(() => {
    if (slug === 'random') {
      fetch(
        `https://api.unsplash.com/photos/random?count=30&client_id=${unsplashApiKey}`,
      )
        .then((res) => res.json())
        .then((result) => {
          const img = result.map((rslt) => rslt.urls.regular);
          setData(img);
        })
        .catch((err) => console.log(err));
    } else {
      fetch(
        `https://api.unsplash.com/topics/${slug}/photos?page=${page}&client_id=${unsplashApiKey}`,
      )
        .then((res) => res.json())
        .then((result) => {
          const img = result.map((rslt) => rslt.urls.regular);
          data.length === 0 ? setData(img) : setData([...data, ...img]);
        })
        .catch((err) => console.log(err));
    }
  }, [page]);
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
              <Image source={{uri: item}} style={wallpaper} />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
        <ActionBar
          colors={colors}
          bottom={bottom}
          shareWallpaper={shareWallpaper}
        />
      </View>
    );
  };
  //
  const shareWallpaper = async () => {
    try {
      await Share.share({
        message: 'Checkout this wallpaper ',
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container color={colors.background}>
      {data.length === 0 ? (
        <Loading />
      ) : (
        <FlatList
          scrollEnabled={!isImageFocused}
          horizontal
          pagingEnabled
          data={data}
          renderItem={renderWallpapers}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onEndReached={() => setPage(page + 1)}
        />
      )}
    </Container>
  );
};
export default WallpaperScreen;
