import * as WebBrowser from 'expo-web-browser';
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

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
    state = {
      status: 'checked',
      title: '',
      message: '',
      image: 'https://picsum.photos/200/300/?blur=7',
      secret: '',
      type: 'other',
      isEncrypted: false,
      visible: false,
      preview: false,
      buttonText: true,
      location: null,
      errorMessage: null,
      latitude : null,
      longitude : null,
      base64StringVar : '',
  };

  return (
    <View>
      <ScrollView>
        <View>

            <TextInput
              style={{backgroundColor: 'white', margin: 5}}
              label='Parcel ID'
              value={this.state.title}
              onChangeText={title => this.setState({ title })}
            />

            <TextInput
              style={{backgroundColor: 'white', margin: 5}}
              label='User Email '
              value={this.state.title}
              onChangeText={title => this.setState({ title })}
            />

           <TextInput
              style={{backgroundColor: 'white', margin: 5}}
              label='trackLocation'
              value={this.state.title}
              onChangeText={title => this.setState({ title })}
            />

            <TextInput
              style={{backgroundColor: 'white', margin: 5}}
              label='trackDate'
              value={this.state.title}
              onChangeText={title => this.setState({ title })}
            />

            <Button style={{margin: 5, padding: 5, backgroundColor: 'rgba(0,150,50,0.8)'}} mode="contained"> Submit </Button>


        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
   title: 'Create Parcel',
};

