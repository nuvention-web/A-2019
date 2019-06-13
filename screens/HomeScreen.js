import React from 'react';
import { ImageBackground } from 'react-native';
import HomeTab from '../components/HomeTab';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
       

            <ImageBackground
              source={
                require('../statics/pictures/oval.png')
              }
              style={styles.welcomeImage}
              imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover'}}>

              <Image source={
                require('../statics/pictures/weather.png')
              }
              style={{ width: '50%', resizeMode: 'contain', marginLeft: 20, marginTop: 20, flex: 0}}/>

              <Text style={styles.welcomeText}>
                Morning, Jessica!
              </Text>

              <Text style={styles.titleText}>
                Here is your outfit for the day.
              </Text>              

            </ImageBackground>
          <HomeTab/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeText:{
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 20
  },
  titleText:{
    color: 'white',
    marginTop: 10,
    fontSize: 20,
    marginLeft: 20
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center'
  },
  welcomeImage: {  
    backgroundColor: '#fff',
    height: '32%'
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
