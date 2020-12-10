import React, { useRef, useCallback } from 'react';
import { ScrollView, View, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import Input from '../../componentes/Input';
import Button from '../../componentes/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  UserAvatarButton,
  UserAvatar,
  Title,
  BackButton,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSingUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado!',
          'Você ja pode fazer seu logon no GoBarber.',
        )

        navigation.goBack();

      } catch (err) {
        console.log(err)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente.'
        )

      }
    },
    [navigation],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container >
          <BackButton onPress={() => {}}>
            <Icon name="chevron-left" size={24} color="#999591"/>
          </BackButton>
          <UserAvatarButton onPress={handleGoBack}>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </UserAvatarButton>

          <View>
              <Title>Meu perfil</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSingUp}>

              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                returnKeyType="next"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => {
                  () => formRef.current?.submitForm()
                }}
              />

              <Input
                ref={confirmPasswordInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  () => formRef.current?.submitForm()
                }}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
            </Button>
            </Form>

        </Container>
      </ScrollView>
    </>
  );
}

export default Profile;
