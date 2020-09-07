import React from 'react';
import { Image } from 'react-native';

import Input from '../../componentes/Input';
import Button from '../../componentes/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title } from './styled';

const SignIn: React.FC = () => {
  return (
    <Container >
      <Image source={logoImg} />

      <Title>Faça seu logon</Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button>Entrar</Button>
    </Container>
  );
}

export default SignIn;
