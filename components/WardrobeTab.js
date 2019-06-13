import * as React from 'react';
import { View, ScrollView, FlatList, StyleSheet, Dimensions, Image, ImageBackground, Text, CameraRoll } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import { FloatingAction } from 'react-native-floating-action';
import { ImagePicker, Permissions, Constants } from 'expo';
import FileUploader from "react-firebase-file-uploader";
import firebase from './../Firebase.js';
import SingleWardrobeTab from './SingleWardrobeTab.js';

 
// More info on all the options is below in the API Reference... just some common use cases shown here

        // <FloatingAction
        //   actions={actions}
        //   color='#FF9696'
        //   onPressItem={
        //     (name) => {
        //       name=='uploadPicture' ? this.useLibraryHandler() : this.useCameraHandler();
        //     }
        //   }
        // />

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

const requireFile = (id) =>{
			  	switch (id) {
			  		case 1: return require('../statics/pictures/top1.png');
			  		case 2: return require('../statics/pictures/top2.png');
			  		case 3: return require('../statics/pictures/top3.png');
			  		case 4: return require('../statics/pictures/top4.png');
			  		case 5: return require('../statics/pictures/top5.png');
			  		case 6: return require('../statics/pictures/top6.png');
            case 7: return require('../statics/pictures/top7.png');
}}
const requireBottom = (id) =>{
          switch (id) {
            case 1: return require('../statics/pictures/bottom1.png');
            case 2: return require('../statics/pictures/bottom2.png');
            case 3: return require('../statics/pictures/bottom3.png');
            case 4: return require('../statics/pictures/bottom4.png');
            case 5: return require('../statics/pictures/bottom5.png');
            // case 6: return require('../statics/pictures/bottom6.png');
            // case 7: return require('../statics/pictures/bottom7.png');
}}
const requireShoe = (id) =>{
          switch (id) {
            case 1: return require('../statics/pictures/shoe1.png');
            case 2: return require('../statics/pictures/shoe2.png');
            case 3: return require('../statics/pictures/shoe3.png');
            // case 4: return require('../statics/pictures/shoe4.png');
            // case 5: return require('../statics/pictures/shoe5.png');
            // case 6: return require('../statics/pictures/shoe6.png');
            // case 7: return require('../statics/pictures/shoe7.png');
}}
const requireCoat = (id) =>{
          switch (id) {
            case 1: return require('../statics/pictures/coat1.png');
            case 2: return require('../statics/pictures/coat2.png');
            // case 3: return require('../statics/pictures/coat3.png');
            // case 4: return require('../statics/pictures/coat4.png');
            // case 5: return require('../statics/pictures/coat5.png');
            // case 6: return require('../statics/pictures/coat6.png');
            // case 7: return require('../statics/pictures/coat7.png');
}}
const trousersUrl = [
  {id: 1, url: "https://firebasestorage.googleapis.com/v0/b/profashion.appspot.com/o/images%2Fwhite.png?alt=media&token=592700e5-8eb0-44c7-b04f-94c012cceb7c"},
  {id: 2, url: "https://firebasestorage.googleapis.com/v0/b/profashion.appspot.com/o/images%2Fblue.png?alt=media&token=44b579c6-7b38-4f63-904a-f0e8e5e9af05"},
  {id: 3, url: "https://firebasestorage.googleapis.com/v0/b/profashion.appspot.com/o/images%2Ftrousers_gray.png?alt=media&token=43c9e3ec-16ad-4a75-9eab-d2b4b896aa69"},
  {id: 4, url: "https://firebasestorage.googleapis.com/v0/b/profashion.appspot.com/o/images%2Forange.png?alt=media&token=3ee3dcdd-59b9-4f62-9155-620c0d19662f"},
  {id: 5, url: "https://firebasestorage.googleapis.com/v0/b/profashion.appspot.com/o/images%2Fblack.png?alt=media&token=c7d5fdbf-a6d8-4b62-9ca2-22675a57e5f3"},
]


export default class WardrobeTab extends React.Component {
  componentDidMount() {
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

	TopRoute = () => {
    return(
      <SingleWardrobeTab type="tops" switch={this.props.switch} startLoading={this.props.startLoading} navigation={this.props.navigation} />
)
  };
  BottomRoute = () => {
    return(
      <SingleWardrobeTab type="bottoms" switch={this.props.switch} startLoading={this.props.startLoading} navigation={this.props.navigation}/>)
  
  };
  CoatRoute = () => (
      <View >
        <FlatList
          data={[{key: 1}, {key: 2}]}
          style={{backgroundColor: '#F7F7F7'}}
          numColumns={2}
          renderItem={({item}) => {
            var img = requireCoat(item.key);
            return(
            <View style={styles.imageContainer}>
              <Image style={styles.imageBg} source={require('../statics/pictures/cloth-bg.png')} />
              <Image style={styles.imageCloth} source={img} />
            </View>);
          }}
          />
      </View>
  );
  ShoeRoute = () => (
      <View >
        <FlatList
          data={[{key: 1}, {key: 2}, {key: 3}]}
          style={{backgroundColor: '#F7F7F7'}}
          numColumns={2}
          renderItem={({item}) => {
            var img = requireShoe(item.key);
            return(
            <View style={styles.imageContainer}>
              <Image style={styles.imageBg} source={require('../statics/pictures/cloth-bg.png')} />
              <Image style={styles.imageCloth} source={img} />
            </View>);
          }}
          />
      </View>
  );
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
      this.props.switch(result.uri);  
    }
  };

  useCameraHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      quality:0.1});
    if (!result.cancelled) {
      this.props.startLoading();
      await this.uploadImage(result.uri); 
    }
    this.props.switch();
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
          coat: this.CoatRoute,
          shoe: this.ShoeRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{width: Dimensions.get('window').width}}
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