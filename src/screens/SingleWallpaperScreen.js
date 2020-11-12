import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SingleWallpaper = (props) => (
  <View style={styles.container}>
    <Text>SingleWallpaper</Text>
  </View>
);
export default SingleWallpaper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
