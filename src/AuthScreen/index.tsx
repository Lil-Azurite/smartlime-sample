import { useCallback, useMemo } from 'react';
import { ActivityIndicator, Alert, Button } from 'react-native';
import { useAuthState, useStartAuth } from '@intra-mart/smartlime';
import { SessionScreen } from './session';
import { MeScreen } from './me';

const alertNoticeResultType = ['error', 'locked', 'exception'];

interface DefaultAuthScreenProps {
  children: JSX.Element;
}

export const AuthScreen = ({ children }: DefaultAuthScreenProps) => {
  const state = useAuthState();
  const startAuth = useStartAuth();

  const onPress = useCallback(async () => {
    const result = await startAuth();
    if (alertNoticeResultType.includes(result.type)) {
      Alert.alert('error occurred during authentication');
    }
  }, [startAuth]);

  return useMemo(() => {
    return state === 'initializing' ? (
      <ActivityIndicator />
    ) : state === 'authorized' ? (
      <MeScreen>
        <SessionScreen>{children}</SessionScreen>
      </MeScreen>
    ) : (
      <Button onPress={onPress} title={'認証'} />
    );
  }, [state]);
};
