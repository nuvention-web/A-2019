import * as React from 'react';
import { View, StyleSheet, Dimensions, Image, ImageBackground, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
 
const FormalRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} >
    <ImageBackground 
      style={{height: '100%', flex: 0}}
      imageStyle={{ width: '100%', resizeMode: 'cover' }}
      source={require('../statics/pictures/home-meeting.png')} >
      <Text style={{position: 'absolute', marginLeft: '62%', marginTop: '12%', color: 'gray'}}>
        Refernce
      </Text>
      <Text style={{position: 'absolute', marginLeft: '62%', marginTop: '70%', color: 'black', fontWeight: 'bold', fontSize: 20}}>
        Decent & formal
      </Text>
      <Text style={{position: 'absolute', marginLeft: '62%', marginTop: '85%', color: 'black', fontSize: 16}}>
        - Classic black & gray
      </Text>
    </ImageBackground>
  </View>
);
const SemiformalRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} >
    <ImageBackground 
      style={{height: '100%', flex: 0}}
      imageStyle={{ width: '100%', resizeMode: 'cover' }}
      source={require('../statics/pictures/home-office.png')} >
      <Text style={{position: 'absolute', marginLeft: '62%', marginTop: '12%', color: 'gray'}}>
        Refernce
      </Text>
      <Text style={{position: 'absolute', marginLeft: '62%', marginTop: '70%', color: 'black', fontWeight: 'bold', fontSize: 20}}>
        Gentle and intellectual
      </Text>
      <Text style={{position: 'absolute', marginLeft: '62%', marginTop: '85%', color: 'black'}}>
        - Checked shirt{'\n'}
        - Light-colored {'\n '}skirt 
      </Text>
    </ImageBackground>
  </View>
);
const CasualRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} >
    <ImageBackground 
      style={{height: '100%', flex: 0}}
      imageStyle={{ width: '100%', resizeMode: 'cover' }}
      source={require('../statics/pictures/home-casual.png')} >
      <Text style={{position: 'absolute', marginLeft: '62%', marginTop: '12%', color: 'gray'}}>
        Refernce
      </Text>
      <Text style={{position: 'absolute', marginLeft: '62%', marginTop: '70%', color: 'black', fontWeight: 'bold', fontSize: 20}}>
        Trendy this Spring
      </Text>
      <Text style={{position: 'absolute', marginLeft: '62%', marginTop: '85%', color: 'black'}}>
        - Textile printing{'\n'}
        - Bright color
      </Text>
    </ImageBackground>
  </View>
);

export default class HomeTab extends React.Component {
  state = {
    index: 1,
    routes: [
      { key: 'formal', title: 'Formal' },
      { key: 'semiformal', title: 'Semiformal' },
      { key: 'casual', title: 'Casual' },
    ],
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
          formal: FormalRoute,
          semiformal: SemiformalRoute,
          casual: CasualRoute,
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
});