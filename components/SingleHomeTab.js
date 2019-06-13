import * as React from 'react';
import { View, TouchableOpacity, ScrollView, FlatList, StyleSheet, Dimensions, Image, ImageBackground, Text, CameraRoll } from 'react-native';
import firebase from './../Firebase.js';
import { FloatingAction } from 'react-native-floating-action';
import { ImagePicker, Permissions, Constants } from 'expo';
import FileUploader from "react-firebase-file-uploader";

export default class SingleHomeTab extends React.Component {
  
  componentDidMount() {
    firebase.database().ref('serverAddr/').once('value', function (snapshot) {
      var addr = 'http://'+snapshot.val()+'/match/dailyOutfit/';
      this.fetchRecommendations(addr);
    }.bind(this));
  };
  fetchRecommendations = (addr)=>{
      var jsonBody = {
        'dbkey': firebase.auth().currentUser.uid,

      };
      // console.log(jsonBody)
      fetch(addr, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
      }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            this.setState({Top: responseJson[this.props.cate+'DressTop'].img_url,
                           Bottom: responseJson[this.props.cate+'DressBottom'].img_url});
          })
          .catch((error) => {
            console.error(error);
          });    
  };
  state = {
    index: 0,
    photos: {},
    routes: [
      { key: 'top', title: 'Top' },
      { key: 'bottom', title: 'Bottom' },
      { key: 'coat', title: 'Coat' },
      { key: 'shoe', title: 'Shoe' },
    ],

  };
  render() {
    return(
      <View style={{flex:1, backgroundColor: '#F0F0F0', alignItems: 'center'}}>
            <Image style={{resizeMode: 'cover', flex:1, height:200, width: 200}} source={{uri: this.state.Top}} />
            <Image style={{resizeMode: 'cover',flex:1, height:200, width: 200}} source={{uri: this.state.Bottom}} />

        </View>)
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
  imageCloth: {
    flex: 0,
    position: 'absolute',
    top: 30,
    height: 300,
    width: 250,
    resizeMode: 'contain',
  },
  imageBg: {
    flex: 0,
    width: 300,
    height: 350,
    resizeMode: 'cover',
  },
  imageContainer: {
    flex: 1,
      alignItems: 'center',
      backgroundColor: '#F7F7F7'
  },
});