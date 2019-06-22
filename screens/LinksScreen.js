import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {
  Text,
  AppRegistry,
} from 'react-native';
import App from 'react-native-nfc-manager/example/App'
AppRegistry.registerComponent('NfcManagerDev', () => App);

import NfcManager, {ByteParser, Ndef, NdefParser} from 'react-native-nfc-manager'


export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
        <Text style={styles.getStartedText}>
            This is our IntelliParcel app
          </Text>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
