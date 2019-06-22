import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Searchbar, Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';

export default function SettingsScreen() {
  return (
    <ScrollView style={{backgroundColor: 'rgba(0,150,150,0.2)'}}>
          <Searchbar
          style={{margin: 3, marginTop: 5}}
          placeholder="Search"
       />

      <Card style={{margin: 3}}>
        <Card.Content style={{paddingBottom: 10}}>
          <Title>Shoe delivery</Title>
          <Paragraph>Location: CB21TA Cambridge</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://placeimg.com/640/480/nature?t=1157059912909' }} />
       </Card>

       <Card style={{margin: 3}}>
        <Card.Content style={{paddingBottom: 10}}>
          <Title>Asda food</Title>
          <Paragraph>Location: CB22BC Cambridge</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://placeimg.com/640/480/nature?t=1517059912909' }} />
       </Card>

       <Card style={{margin: 3}}>
        <Card.Content style={{paddingBottom: 10}}>
          <Title>John Lewis</Title>
          <Paragraph>Location: CB11AS Cambridge</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://placeimg.com/640/480/nature?t=1557059911909' }} />
       </Card>

       <Card style={{margin: 3}}>
        <Card.Content style={{paddingBottom: 10}}>
          <Title>Tailor delivery</Title>
          <Paragraph>Location: CB21TA Cambridge</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://placeimg.com/640/480/nature?t=1557059912919' }} />
       </Card>
    </ScrollView>
  );
}


SettingsScreen.navigationOptions = {
  title: 'My parcels',
};
