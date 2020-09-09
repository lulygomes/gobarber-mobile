import React, { useRef } from 'react';
import { Image, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

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
  const formRef = useRef<FormHandles>(null);
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

          <Form ref={formRef} onSubmit={(data) => { console.log(data) }}>
            <Input name="Name" icon="user" placeholder="Nome" />

            <Input
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
            />

            <Input
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              keyboardType="numeric"
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Form>

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
