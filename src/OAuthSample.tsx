import React from 'react';
import { Button } from 'react-native';
import { useIMOAuth, useIMToken } from '@intra-mart/smartlime';

export default function OAuthSample() {
  console.log('render');
  const token_useIMToken = useIMToken(); // これはrender内で常に同じ値
  const { refresh, getToken, getTokenAsync } = useIMOAuth();

  const onPress = async () => {
    console.log({ token_useIMToken });

    const token_getToken = getToken(); // これは現在保持されている値が返る
    console.log({ token_getToken });
    console.log(token_getToken === token_useIMToken); // この段階でこの二つは同じ

    const token_getTokenAsync = await getTokenAsync(); // これはremainingTimeToRunRefreshで指定した時間が経過していた場合、トークンを更新してから返す
    console.log({ token_getTokenAsync });
    console.log(token_getTokenAsync === token_getToken); // つまりこれはfalseの「可能性」がある
    console.log(token_getTokenAsync === getToken()); // getTokenは現在の値を返すのでこれは常にtrueになる
    console.log(token_getTokenAsync === token_useIMToken); // token_useIMTokenの値は変わらないためこれもfalseの可能性がある

    await refresh(); // 更新のみの場合はこれでも出来る getTokenAsyncと違いこれは必ずトークンを更新する
    console.log('refresh', getToken());
  };

  return <Button title={'トークン'} onPress={onPress} />;
}
