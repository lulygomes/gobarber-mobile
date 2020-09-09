import React, { useCallback, useRef } from 'react';
import { Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import Input from '../../componentes/Input';
import Button from '../../componentes/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styled';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback((data: object) => {
    console.warn(data)
  }, [])

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container >
          <Image source={logoImg} />

          <Title>Faça seu logon</Title>

          <Form ref={formRef} onSubmit={handleSignIn}>

            <Input
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
            />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>
          </Form>

          <ForgotPassword>
            <ForgotPasswordText>
              Esqueci minha senha
            </ForgotPasswordText>
          </ForgotPassword>

        </Container>
      </ScrollView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')} >
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>
          Criar uma conta
        </CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
}

export default SignIn;
