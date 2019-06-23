import React from 'react';
import { ScrollView, StyleSheet, Picker } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { ToggleButton } from 'react-native-paper';
import { Divider } from 'react-native-paper';
import { Surface } from 'react-native-paper';
import { Modal, Text, Provider } from 'react-native-paper';
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper';
import { Constants, Location, Permissions } from 'expo';
import {AppRegistry} from 'react-native';
import App from 'react-native-nfc-manager/example/App'
AppRegistry.registerComponent('NfcManagerDev', () => App);

import NfcManager, {ByteParser, Ndef, NdefParser} from 'react-native-nfc-manager'


export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
                    <Button style={{margin: 5, padding: 5, backgroundColor: 'rgba(0,150,50,0.8)'}} mode="contained"> Submit </Button>

    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Scan Parcel NFC Tag',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
