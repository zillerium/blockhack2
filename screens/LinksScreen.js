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
      <Card.Cover style={{height: 350}} source={{ uri: 'https://cryptotrade-hq.com/sbhack/NFC2.jpg' }} />

      {/*
        --> initialize NFC

        NfcManager.start({
            onSessionClosedIOS: () => {
                console.log('ios session closed');
            }
        })
            .then(result => {
                console.log('start OK', result);
            })
            .catch(error => {
                console.warn('device does not support nfc!');
                this.setState({supported: false});
            })


        --> registerTag

        NfcManager.registerTagEvent(
          tag => {
            console.log('Tag Discovered', tag);
          },
          'Hold your device over the tag',
          {
            invalidateAfterFirstRead: true,
            isReaderModeEnabled: true,
            readerModeFlags:
              NfcAdapter.FLAG_READER_NFC_A | NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK,
          },
        );

        --> parse NFC content

        _onTagDiscovered = tag => {
            console.log('Tag Discovered', tag);
            this.setState({ tag });
         
            let parsed = null;
            if (tag.ndefMessage && tag.ndefMessage.length > 0) {
              
                const ndefRecords = tag.ndefMessage;
         
                function decodeNdefRecord(record) {
                    if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                        return ['text', Ndef.text.decodePayload(record.payload)];
                    } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
                        return ['uri', Ndef.uri.decodePayload(record.payload)];
                    }
         
                    return ['unknown', '---']
                }
         
                parsed = ndefRecords.map(decodeNdefRecord);
            }
         
            this.setState({parsed});
        }

      */}
      <Button style={{margin: 5, padding: 5, backgroundColor: 'rgba(0,150,50,0.8)'}} mode="contained"> Scan Package </Button>

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
