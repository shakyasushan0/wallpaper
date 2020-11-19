import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {categories} from '../utilities/categories';

const Pagination = ({scrollX}) => (
  <View style={styles.container}>
    <View style={styles.circle}>
      {categories.map((img, indx) => (
        <View style={styles.pageContainer} key={indx}>
          <Text style={{fontSize: 20}}>{indx + 1}</Text>
        </View>
      ))}
    </View>
  </View>
);
export default Pagination;

const styles = StyleSheet.create({
  container: {},
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'row',
    //overflow: 'hidden',
  },
  pageContainer: {
    // margin: 17,
    width: 50,
    alignItems: 'center',
  },
});
