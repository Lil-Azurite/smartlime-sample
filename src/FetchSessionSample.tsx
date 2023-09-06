import React from 'react';
import { Button } from 'react-native';
import { useSessionState } from '@intra-mart/smartlime';
import { makeCookie } from '@intra-mart/smartlime/lib/packages/Session/utils';
import { Alert } from 'react-native';

// だいぶ黒魔術よりな使い方
// 使い方間違えるとセッションの数が膨れ上がってパフォーマンスの問題がでる
export default function FetchSessionSample() {
  const state = useSessionState();

  const onPress = async () => {
    if (!state.cookies) {
      console.log('not found.');
      return;
    }

    const response = await fetch('endpoint', {
      headers: {
        'Content-Type': 'application/json',
        'X-Intramart-Session': 'keep',
        Cookie: makeCookie(state.cookies),
      },
      method: 'GET',
    });

    const json = await response.json();

    if (json) {
      console.log(json);
      Alert.alert(JSON.stringify(json));
    } else {
      console.log('not found.');
    }
  };

  return <Button title={'リクエスト'} onPress={onPress} />;
}
