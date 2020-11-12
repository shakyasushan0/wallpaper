import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Share,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import FastImage from 'react-native-fast-image';

import {
  Container,
  wallpaperContainer,
  wallpaper,
} from '../styles/WallpaperScreenStyle';
import {useTheme} from 'react-native-paper';
import ActionBar from '../components/ActionBar';

const SingleWallpaper = ({route}) => {
  const {img} = route.params;
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
  //share
  const shareWallpaper = async (pic) => {
    try {
      await Share.share({
        message: 'Checkout this cool wallpaper ' + pic,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //download image
  const checkPermission = async (pic) => {
    if (Platform.OS === 'ios') {
      downloadImage(pic);
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
  const downloadImage = (pic) => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = pic;
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
      <TouchableWithoutFeedback onPress={() => showActionBar()}>
        <Animated.View style={{flex: 1, transform: [{scale}]}}>
          <View style={wallpaperContainer}>
            <FastImage
              source={{uri: img, priority: FastImage.priority.normal}}
              style={wallpaper}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
      <ActionBar
        colors={colors}
        bottom={bottom}
        shareWallpaper={shareWallpaper}
        item={img}
        downloadImage={checkPermission}
      />
    </Container>
  );
};
export default SingleWallpaper;
