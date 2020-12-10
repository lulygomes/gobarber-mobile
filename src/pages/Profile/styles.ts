import styled from 'styled-components/native';
import { Platform } from 'react-native';


export const Container = styled.View`
  flex:1;
  justify-content: center;
  margin-top: 60px;

  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40 }px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const UserAvatarButton = styled.TouchableOpacity`

`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  margin-top: 55px;
  align-self: center;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: -50px;
  left: 10px;

  /* margin-top: 10px; */
`;
