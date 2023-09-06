import { IMWebView, useHackSearchUI } from '@intra-mart/smartlime';

import { StyleSheet, View } from 'react-native';

export default function WebViewSmaple() {
  const props = useHackSearchUI();

  return (
    <View style={styles.container}>
      <IMWebView
        {...props}
        source={{
          uri: '',
        }}
        style={styles.webview}
        onSessionCreationError={(e) => {
          console.log('error', e);
        }}
      />
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
  webview: {
    flex: 1,
    height: 400,
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
