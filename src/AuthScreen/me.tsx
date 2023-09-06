import { useIMOAuth, useMe, useMeState } from '@intra-mart/smartlime';
import { useMemo, useRef } from 'react';
import { ActivityIndicator } from 'react-native';

interface DefaultMeProps {
  children: JSX.Element;
}

export const MeScreen = ({ children }: DefaultMeProps) => {
  const isInitRef = useRef(false);
  const state = useMeState();
  const { request } = useMe();
  const { destroy } = useIMOAuth();

  if (!state && !isInitRef.current) {
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
    return state ? children : <ActivityIndicator />;
  }, [state]);
};
