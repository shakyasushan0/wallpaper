import styled from 'styled-components';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const Container = styled.View`
  background-color: ${(props) => props.color};
  flex: 1;
`;
export const Header = styled.View`
  background-color: #2ecc72;
  height: 70px;
  padding: 10px;
`;
