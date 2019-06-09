import * as React from 'react';
import { View, TouchableOpacity, ScrollView, FlatList, StyleSheet, Dimensions, Image, ImageBackground, Text, CameraRoll } from 'react-native';
import firebase from './../Firebase.js';
import { FloatingAction } from 'react-native-floating-action';
import { ImagePicker, Permissions, Constants } from 'expo';
import FileUploader from "react-firebase-file-uploader";

const actions = [{
  text: 'Take a picture',
  icon: require('../assets/images/camera-icon.png'),
  name: 'takePicture',
  position: 2,
  color: 'white'
}, {
  text: 'Upload from album',
  icon: require('../assets/images/photo-icon.png'),
  name: 'uploadPicture',
  position: 1,
  color: 'white'
}];
export default class SingleWardrobeTab extends React.Component {
  componentDidMount() {
    this.refreshContents();
  }
  componentWillMount() {
    this.refreshContents();
  }
  refreshContents = () =>{
     firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/items').on('value', function (snapshot) {
      var dictArray = snapshot.val()
      var arrayLength = dictArray.length;
      var array_bottoms = new Array();
      // for (var i = 1; i < arrayLength; i++) {
      //     if (dictArray[i]["type"]==this.props.type){
      //       array_bottoms.push(dictArray[i]["img_url"]);
      //     }
      // }
      for (var key in dictArray){
          if (dictArray[key]["type"]==this.props.type){
            array_bottoms.push({img_url:dictArray[key]["img_url"], clothID:key});
          }        
      }
      this.setState({trousersUrl: array_bottoms});
      // console.log(this.state.trousersUrl, this.props.type,dictArray)
    }.bind(this));    
  }
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

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 2],
      base64: false,
      quality: 0.1,
    });
    if (!result.cancelled) {
      this.props.startLoading();
      await this.uploadImage(result.uri); 
      this.props.switch(result.uri, this.props.type);  
    }
  };

  useCameraHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      quality:0.1});
    if (!result.cancelled) {
      this.props.startLoading();
      await this.uploadImage(result.uri); 
    this.props.switch(result.uri, this.props.type);
    }
  };

  uploadImage = async(uri) => {
    const response = await fetch(uri);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    var ref = firebase.storage().ref('images').child(firebase.auth().currentUser.uid+'.png');
    const res = await ref.put(blob);

  } 
  render() {
    return(
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.trousersUrl}
          extraData={this.state}
          style={{backgroundColor: '#F7F7F7'}}
          numColumns={2}
          renderItem={({item}) => {
            return(
            <TouchableOpacity style={styles.imageContainer} onPress={()=>{this.props.navigation.navigate('ItemMatch',{imgUrl: item.img_url, clothID: item.clothID})}}>
              <Image style={styles.imageBg} source={require('../statics/pictures/cloth-bg.png')} />
              <Image style={styles.imageCloth} source={{uri:item.img_url}} />
            </TouchableOpacity>);
          }}
          />
        <FloatingAction
          actions={actions}
          color='#FF9696'
          onPressItem={
            (name) => {
              name=='uploadPicture' ? this.useLibraryHandler() : this.useCameraHandler();
            }
          }
        />
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
  scene: {
    flex: 0,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'gray',
  },
});