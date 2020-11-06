import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const WallpaperScreen = (props) => (
  <View style={styles.container}>
    <Text>WallpaperScreen</Text>
  </View>
);
export default WallpaperScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
