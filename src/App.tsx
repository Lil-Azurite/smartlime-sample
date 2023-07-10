import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Smartlime } from '@intra-mart/smartlime';
import { DefaultAuthScreen, DefaultSearchUI } from '@intra-mart/smartlime-ui';

export default function App() {
  return (
    <View style={styles.container}>
      <Smartlime
        baseUrl={''}
        imoauth={{
          requestConfig: {
            clientId: '',
            clientSecret: '',
            scopes: [],
            redirectUri: 'exp://127.0.0.1:19000',
          },
        }}
        imseach={{ SearchComponent: DefaultSearchUI }}
      >
        <DefaultAuthScreen>
          <View />
        </DefaultAuthScreen>
      </Smartlime>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
