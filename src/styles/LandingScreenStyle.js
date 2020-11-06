import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
`;
export const Text = styled.Text`
  font-size: 16px;
  color: green;
`;

export const Background = styled.Image`
  width: null;
  height: null;
  flex: 1;
`;

export const ImageContainer = styled.View`
  flex: 1;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: absolute;
`;
export const Explore = styled.View`
  align-items: center;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 105px;
`;
export const Favorite = styled.View`
  align-items: center;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 50px;
`;
export const explore = {
  borderRadius: 20,
  width: '85%',
  height: 45,
  justifyContent: 'center',
};
export const favorite = {
  borderRadius: 20,
  width: '85%',
  height: 45,
  justifyContent: 'center',
};
export const GreetingContainer = styled.View`
  align-items: center;
  margin-top: 12%;
`;
export const Welcome = styled.Text`
  color: #eaf0f1;
  font-size: 50px;
  letter-spacing: 5px;
`;
export const Description = styled.Text`
  font-size: 16px;
  color: floralwhite;
`;
