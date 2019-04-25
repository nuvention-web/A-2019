import * as React from 'react';
import { View, TouchableHighlight, ScrollView, FlatList, StyleSheet, Dimensions, Image, ImageBackground, Text, CameraRoll } from 'react-native';				  	
import { Button, Card, ListItem, Avatar } from 'react-native-elements';
import { Icon } from 'expo';
import firebase from './../Firebase.js';
console.disableYellowBox = true;
export default class ClothFeatures extends React.Component {
  goBack = ()=>{
  	console.log(123);
  }
  state = {
  	imgurl: "",
    features: {'color': ' '},
    matchCloth: {}
  }
  componentDidMount() {
    firebase
      .storage()
      .ref("images")
      .child("upload.png")
      .getDownloadURL()
      .then(url => {this.setState({ imgurl: url });
        var jsonBody = {
          // 'userid': firebase.auth().currentUser.uid,
          'user_name': 'Wei Hang',
          "cloth_type": "jacket",
          "jacket" : {"color" : "purple"},
          'img_url': this.state.imgurl
        };
        console.log(jsonBody);
        fetch('http://54.219.183.166/match/predict/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonBody),
        }).then((response) => response.json())
            .then((responseJson) => {
              this.setState({features: {'color':responseJson.colorPredict} });
              this.setState({matchCloth: responseJson.matchCloth });
              console.log(responseJson);
            })
            .catch((error) => {
              console.error(error);
            })});
  }
  render() {
    var img = require('../statics/pictures/cloth-detail-bg.png');
  	return(
      <View style={{backgroundColor: '#F7F7F7', flex:1}}>
    		<View style={{backgroundColor: '#F7F7F7',flex: 1, alignItems: 'center',}}>
          <Image style={styles.imageBg} source={img} />
  		  	<Image style={styles.imageCloth} source={{uri: this.state.imgurl}} />
    		</View>
        <View style={{top: -30, width: '90%', left: 20}}>
          <ListItem
            rightAvatar={      <Icon.Ionicons
              name='ios-create'
              size={26}
              style={{ marginBottom: -3 }}
              color='white'
            />}
            containerStyle={{backgroundColor: '#FF9696'}}
            titleStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
            roundAvatar
            title='Labels'
          />
          {Object.keys(this.state.features).map((key,i) => (
            <ListItem
              key={i}
              title={<View style={{flexDirection:'row'}}><Text style={{flex:1,fontSize:20,height:30, width: 200, textAlign: 'left', alignSelf: 'stretch'}}>{key}</Text><Text style={{flex:1,fontSize:20,height:30, width: 200, textAlign: 'right', alignSelf: 'stretch'}}>{this.state.features[key]}</Text></View>}
            />
          ))}
        </View>
        <View style={{flex:0}}>
          <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 10, left: 20}}> Wear it with {this.state.matchCloth.color}</Text>


            <Image style={{resizeMode: 'contain',height:200}} source={{uri: this.state.matchCloth.img_url}} />

        </View>
      </View>
  	);
  }
}
const styles = StyleSheet.create({  
	cancel:{
		width: 180,
	    paddingTop:20,
	    paddingBottom:20,
	    backgroundColor:'#DCDCDC',
	    borderRadius: 40,
	    borderWidth: 1,
	    borderColor: '#fff'
	},
	submit:{
		width: 180,
	    paddingTop:20,
	    paddingBottom:20,
	    backgroundColor:'#FF9696',
	    borderRadius: 40,
	    borderWidth: 1,
	    borderColor: '#fff'
	},
	tag1: {
		position: 'absolute',
		height: 25,
		top: 70,
		left: 0,
		resizeMode: 'contain',
	},
	tag2: {
		flex: 0,
		position: 'absolute',
		height: 25,
		top: 140,
		left: -10,
		resizeMode: 'contain',
	},
	tag3: {
		flex: 0,
		position: 'absolute',
		height: 25,
		top: 210,
		left: 40,
		resizeMode: 'contain',
	},
	tag4: {
		flex: 0,
		position: 'absolute',
		height: 25,
		top: 280,
		left: 10,
		resizeMode: 'contain',
	},
  imageCloth: {
    flex: 0,
    position: 'absolute',
    top: 10,
    height: 180,
    width: 180,
    resizeMode: 'contain',
  },
  imageBg: {
    flex: 0,
    position: 'absolute',
    height: 200,
    resizeMode: 'contain',
  },
	imageContainer: {
		flex: 1,
  		alignItems: 'center',
    	backgroundColor: '#F7F7F7'
	},
});