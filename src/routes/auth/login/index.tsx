import * as React from 'react';

import useLogin from './useLogin';
import {
  Container,
  Title,
  LogoContainer,
  InputContainer,
  LoginContainer,
  SocialContainer,
} from './styles';
import Logo from '@assets/images/logo.svg';
import { dimensions } from '@styles';
import TextInput from '@components/text-input';
import * as strings from '@locales/login';
import Button from '@components/button';
import { StackScreenProps } from '@react-navigation/stack';
import { UnauthenticatedParamsList } from '@navigator/unauthenticated';
import FullscreenLoader from '@components/fullscreen-loader';

export type Props = StackScreenProps<UnauthenticatedParamsList, 'Login'>;

const Login = (props: Props) => {
  const {
    handleLoginAnonymously,
    isLoading,
    setEmail,
    email,
    password,
    setPassword,
    handleLoginEmailPassword,
    handleRegisterUser,
    handleErrorMessage,
    isLoggedAnonymously,
  } = useLogin(props);

  const shouldShowLoading = isLoading;
  const shouldShowLoginScreen = !isLoading;

  return (
    <Container keyboardShouldPersistTaps="handled">
      {shouldShowLoading && <FullscreenLoader />}

      {shouldShowLoginScreen && (
        <LoginContainer>
          <LogoContainer>
            <Logo
              width={dimensions.size.stackXxxlNumber}
              height={dimensions.size.stackXxxlNumber}
            />
            <Title>{strings.welcome}</Title>
          </LogoContainer>
          <InputContainer>
            <TextInput
              title={strings.email}
              onChangeText={setEmail}
              value={email}
              icon="account"
              error={!!handleErrorMessage('email').error}
              {...handleErrorMessage('email')}
            />
            <TextInput
              title={strings.password}
              onChangeText={setPassword}
              value={password}
              icon="lock"
              secureTextEntry
              error={!!handleErrorMessage('password').error}
              {...handleErrorMessage('password')}
            />
            <Button title={strings.login} onPress={handleLoginEmailPassword} />
            <Button title={strings.register} onPress={handleRegisterUser} />
          </InputContainer>
          {!isLoggedAnonymously && (
            <SocialContainer>
              <Button
                mode="flat"
                title={strings.continueWithoutLogin}
                onPress={handleLoginAnonymously}
              />
            </SocialContainer>
          )}
        </LoginContainer>
      )}
    </Container>
  );
};

export default Login;