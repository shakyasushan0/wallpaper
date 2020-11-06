import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
`;
export const Ticker = styled.Text`
  font-size: 35px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  line-height: 35px;
  color: ${(props) => props.color};
`;
export const TickerContainer = styled.View`
  position: absolute;
  overflow: hidden;
  top: 15px;
  left: 15px;
  height: 35px;
`;
export const cardContainer = {
  flex: 1,
  justifyContent: 'center',
  padding: 10,
};
