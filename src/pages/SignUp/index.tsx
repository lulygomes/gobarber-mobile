import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Input from '../../componentes/Input';
import Button from '../../componentes/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText
} from './styled';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container >
          <Image source={logoImg} />

          <View>
            <Title>Crie sua conta</Title>
          </View>

          <Input name="Name" icon="user" placeholder="Nome" />
          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="password" icon="lock" placeholder="Senha" />

          <Button>Cadastrar</Button>

        </Container>
      </ScrollView>

      <BackToSignIn onPress={() => navigation.goBack()} >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>
          Voltar para logon
        </BackToSignInText>
      </BackToSignIn>
    </>
  );
}

export default SignUp;
