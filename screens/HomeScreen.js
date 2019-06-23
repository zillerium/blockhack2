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
      
            <Card.Cover style={{marginTop: 14}} source={{ uri: 'https://cryptotrade-hq.com/sbhack/parcel.jpg' }} />

            <TextInput
              style={{backgroundColor: 'white', margin: 5}}
              label='Parcel ID'
             
            />

            <TextInput
              style={{backgroundColor: 'white', margin: 5}}
              label='User Email '
              
            />

           <TextInput
              style={{backgroundColor: 'white', margin: 5}}
              label='trackLocation'
              
            />

            <TextInput
              style={{backgroundColor: 'white', margin: 5}}
              label='trackDate'
              
            />

            <Button style={{margin: 5, padding: 5, backgroundColor: 'rgba(150,0,50,0.8)'}} 
                    mode="contained"> Sign NFC Tag</Button>
            <Button style={{margin: 5, padding: 5, backgroundColor: 'rgba(0,150,50,0.8)'}} mode="contained"> Submit to chain </Button>


        </View>
      </ScrollView>
    </View>
  );
  
}

HomeScreen.navigationOptions = {
   header: null,
};

