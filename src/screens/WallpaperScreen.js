import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Share,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

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
          item={item}
          downloadImage={checkPermission}
        />
      </View>
    );
  };
  //share
  const shareWallpaper = async (img) => {
    try {
      await Share.share({
        message: 'Checkout this cool wallpaper ' + img,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //download image
  const checkPermission = async (img) => {
    if (Platform.OS === 'ios') {
      downloadImage(img);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to save wallpapers',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          ToastAndroid.show('Your download has started', ToastAndroid.SHORT);
          downloadImage(img);
        } else {
          // If permission denied then show alert
          ToastAndroid.show('Permission denied!', ToastAndroid.SHORT);
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };
  const downloadImage = (img) => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = img;
    // Getting the extention of the file
    let ext = '.jpg';

    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        ToastAndroid.show('Image Downloaded Successfully.', ToastAndroid.SHORT);
      });
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
