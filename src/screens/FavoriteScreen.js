import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Switch, useTheme} from 'react-native-paper';
import {ThemeContext} from '../context/ThemeContext';

const FavoriteScreen = (props) => {
  const {darkTheme, setDarkTheme} = useContext(ThemeContext);
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Switch
        value={darkTheme}
        onValueChange={() => setDarkTheme(!darkTheme)}
      />
      <Text style={{color: colors.text}} onPress={() => alert(darkTheme)}>
        ALert
      </Text>
    </View>
  );
};
export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
