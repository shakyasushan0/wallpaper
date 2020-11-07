import styled from 'styled-components';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.color};
`;

export const wallpaperContainer = {
  flex: 1,
  width: width,
  height: height,
};
export const wallpaper = {
  width: null,
  height: null,
  flex: 1,
};

export const actionBar = {
  height: 70,
  position: 'absolute',
  left: 0,
  right: 0,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
};
