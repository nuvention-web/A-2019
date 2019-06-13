import * as React from 'react';
import { View, StyleSheet, Dimensions, Image, ImageBackground, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import SingleHomeTab from './SingleHomeTab.js';
import firebase from './../Firebase.js';
 


export default class HomeTab extends React.Component {
  state = {
    index: 1,
    routes: [
      { key: 'formal', title: 'Formal' },
      { key: 'semiformal', title: 'Semiformal' },
      { key: 'casual', title: 'Casual' },
    ],
    formalDressTop: '',
    formalDressBottom: '',
    semiformalDressTop: '', 
    semiformalDressBottom: '', 
    casualDressTop: '', 
    casualDressBottom: ''
  };
  SemiformalRoute = () => (

    <SingleHomeTab cate='semiformal'/>

  );
  FormalRoute = () => (

    <SingleHomeTab cate='formal'/>

  );
  CasualRoute = () => (

    <SingleHomeTab cate='casual'/>

  );
 
  render() {
    return (
      <TabView
        renderTabBar={props =>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'pink' }}
            style={{ backgroundColor: 'white' }}
            activeColor='black'
            inactiveColor='gray'
          />
        }
        navigationState={this.state}
        renderScene={SceneMap({
          formal: this.FormalRoute,
          semiformal: this.SemiformalRoute,
          casual: this.CasualRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}
 
const styles = StyleSheet.create({
  labelText: {
    color: 'white'
  },
  scene: {
    flex: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: '#000000'
  },
  logo: {
    width: 160,
    height: 200
  },
  backdrop: {
    flex:1,
    flexDirection: 'column'
  },
  imageContainer: {
    flex: 1,
      alignItems: 'center',
      backgroundColor: '#F7F7F7'
  },
});