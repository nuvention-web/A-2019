import * as React from 'react';
import { View, ScrollView, FlatList, StyleSheet, Dimensions, Image, ImageBackground, Text, CameraRoll } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import firebase from './../Firebase.js';
import BasicItemTab from './BasicItemTab.js';

export default class BasicTabs extends React.Component {

  state = {
    index: 0,
    routes: [
      { key: 'top', title: 'Tops' },
      { key: 'bottom', title: 'Bottoms' },
    ],
    selected: {}

  };

	TopRoute = () => {
    return(
      <BasicItemTab type="tops" select={this.props.selectItem} delete={this.props.deleteItem} />)
  
  };
  BottomRoute = () => {
    return(
      <BasicItemTab type="bottoms" select={this.props.selectItem} delete={this.props.deleteItem} />)
  
  };

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
          top: this.TopRoute,
          bottom: this.BottomRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}
 
const styles = StyleSheet.create({
	imageCloth: {
		flex: 0,
		position: 'absolute',
    left: 10,
    top: 10,
		height: 180,
		width: 180,
		resizeMode: 'contain',
	},
	imageBg: {
		flex: 0,
		height: 200,
		width: 200,
		resizeMode: 'contain',
	},
	imageContainer: {
		flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
	},
  labelText: {
    color: 'white'
  },
  scene: {
    flex: 0,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'gray',
  },
});