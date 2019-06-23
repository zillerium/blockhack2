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
          <Title>Robert Müller</Title>
          <Paragraph>Destination: CB21TA Cambridge</Paragraph>
          <Paragraph>ParcelID: HSJ21JA</Paragraph>
          <Paragraph>Status: In Time</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://cryptotrade-hq.com/sbhack/map1.jpg' }} />
       </Card>

       <Card style={{margin: 3}}>
        <Card.Content style={{paddingBottom: 10}}>
          <Title>Hans Gerhard</Title>
          <Paragraph>Destination: CB22BC Cambridge</Paragraph>
          <Paragraph>ParcelID: HES22JL</Paragraph>
          <Paragraph>Status: Delayed</Paragraph>
          <Paragraph style={{color: 'red'}} >Warning: Fragile Content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://cryptotrade-hq.com/sbhack/map2.jpg' }} />
       </Card>

       <Card style={{margin: 3}}>
        <Card.Content style={{paddingBottom: 10}}>
          <Title>John Lewis</Title>
          <Paragraph>Destination: CB11AS Zürich</Paragraph>
          <Paragraph>ParcelID: SRJ62PO</Paragraph>
          <Paragraph>Status: In Time</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://cryptotrade-hq.com/sbhack/map3.jpg' }} />
       </Card>

       
    </ScrollView>
  );
}


SettingsScreen.navigationOptions = {
  title: 'Parcel Overview',
};
