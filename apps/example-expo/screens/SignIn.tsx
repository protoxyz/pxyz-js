import { useProtocolAuth, useProtocolAuthClient } from '@protoxyz/auth-react';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  AuthSignInAttemptStatus,
  AuthVerificationStrategy,
} from '@protoxyz/types';

export default function SignInScreen() {
  const { setToken, protocol } = useProtocolAuth();
  const { signIn, setSignIn } = useProtocolAuthClient();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [error, setError] = React.useState('');
  const [code, setCode] = React.useState('');

  const onSignIn = async () => {
    const response = await protocol?.auth.signInAttempts.create({
      body: {
        identifier: emailAddress,
        strategy: AuthVerificationStrategy.email_code,
      },
    });

    if (response?.status !== 'success') {
      setError(response?.error ?? '');
      return;
    }

    if (response.data.signInAttempt) {
      setSignIn(response?.data.signInAttempt);
    }
  };

  const onPressVerify = async () => {
    const response = await protocol?.auth.signInAttempts.attemptFirstFactor({
      path: {
        id: signIn?.id ?? '',
      },
      body: {
        code,
      },
    });

    if (response?.status !== 'success') {
      setError(response?.error ?? '');
      return;
    }

    if (response.data.jwt) {
      setToken(response.data.jwt);
    }

    // navigate("/profile");
  };

  return (
    <View>
      {!signIn && (
        <View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>

          <TouchableOpacity onPress={onSignIn}>
            <Text>Sign in</Text>
          </TouchableOpacity>
        </View>
      )}

      {signIn?.status === AuthSignInAttemptStatus.needs_factor_one && (
        <View>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
