import { useIMOAuth, useSession, useSessionState } from '@intra-mart/smartlime';
import { useMemo, useRef } from 'react';
import { ActivityIndicator } from 'react-native';

interface DefaultMeProps {
  children: JSX.Element;
}

export const SessionScreen = ({ children }: DefaultMeProps) => {
  const isInitRef = useRef(false);
  const state = useSessionState();
  const { request } = useSession();
  const { destroy } = useIMOAuth();

  if (!state.cookies && !isInitRef.current) {
    isInitRef.current = true;
    request()
      .then((result) => {
        if (result.status === 'error') {
          destroy();
        }
      })
      .catch((e) => {
        console.error(e);
        destroy();
      });
  }

  return useMemo(() => {
    return state.cookies ? children : <ActivityIndicator />;
  }, [state.cookies]);
};
