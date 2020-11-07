import styled from 'styled-components';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const Container = styled.View`
  background-color: ${(props) => props.color};
  flex: 1;
`;
export const Header = styled.View`
  background-color: #e71c23;
  height: 70px;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
`;
export const ThemeText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
