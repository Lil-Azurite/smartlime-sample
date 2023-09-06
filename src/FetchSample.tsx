import React from 'react';
import { Button } from 'react-native';
import { useIMFetch } from '@intra-mart/smartlime';
import { Alert } from 'react-native';

export interface userInfo {
  name: string;
  code: string;
}
interface getUserListRequest {
  error: boolean;
  userInfoList: userInfo[];
}

export default function FetchSample() {
  const imFetch = useIMFetch();

  const onPress = async () => {
    // ここでgenerics書ける
    const response = await imFetch<getUserListRequest>(`endpoint`, {
      method: 'GET',
    });

    /* 
      imFetchに型を渡してると.json()の返りに型が付く
      何も指定しないとデフォルトで以下の型が付く
      type IMJson = {
        error?: boolean;
        errorMessage?: string;
        data?: Record<string, unknown>;
      }
    */
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
