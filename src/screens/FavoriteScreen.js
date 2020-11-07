import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Switch, useTheme} from 'react-native-paper';
import {ThemeContext} from '../context/ThemeContext';
import {Container, Header, ThemeText} from '../styles/FavoriteScreenStyle';

const FavoriteScreen = (props) => {
  const {darkTheme, setDarkTheme} = useContext(ThemeContext);
  const {colors} = useTheme();
  return (
    <Container color={colors.background}>
      <Header>
        <ThemeText>Dark Theme</ThemeText>
        <Switch
          value={darkTheme}
          onValueChange={() => setDarkTheme(!darkTheme)}
        />
      </Header>
    </Container>
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
