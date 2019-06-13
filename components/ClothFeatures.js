import * as React from 'react';
import { View, TouchableHighlight, ScrollView, FlatList, StyleSheet, Dimensions, Image, ImageBackground, Text, CameraRoll } from 'react-native';				  	
import { Button, Card, ListItem, Avatar } from 'react-native-elements';
import { Icon } from 'expo';
import Picker from 'react-native-picker';
import firebase from './../Firebase.js';
console.disableYellowBox = true;

        // <View style={{flex:0}}>
        //   <Text style={{fontFamily: 'open-sans-regular',fontSize: 24, fontWeight: 'bold', marginBottom: 10, left: 20}}> Wear it with {this.state.matchCloth.color}</Text>


        //     <Image style={{resizeMode: 'contain',height:200}} source={{uri: this.state.matchCloth.img_url}} />

        // </View>
        // <View style={{height:20}}/>
// const pickerData = 
//     {
//         'a': [1, 2, 3, 4]
//     };
export default class ClothFeatures extends React.Component {
  goBack = ()=>{
  	this.props.navigation();
  }
  state = {
    disabledBtn: false ,
    serverAddr: '',
  	imgurl: "",
    features: {'color': ' '},
    matchCloth: {}
  }
  setServerAddr = (addr) =>{
    this.setState({serverAddr: addr});
  }
  fetchFeatures = (addr)=>{
    console.log("----------",this.props.type)
    firebase
      .storage()
      .ref("images")
      .child(firebase.auth().currentUser.uid+".png")
      .getDownloadURL()
      .then(url => {this.setState({ imgurl: url });
        var jsonBody = {
          'dbkey': firebase.auth().currentUser.uid,
          'img_url': this.state.imgurl,
          'type': this.props.type

        };
        console.log(this.state.serverAddr);
        fetch(addr, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonBody),
        }).then((response) => response.json())
            .then((responseJson) => {
              var features = {};
              Object.keys(responseJson.labels).forEach(function(key){
                if (responseJson.labels[key]!='Invisible'){ //& key!="pant_length_labels" & key!="skirt_length_labels"){
                  new_key = key.slice(0, -7)
                  features[key.slice(0,-7)]=responseJson.labels[key];
                }
              })
              this.setState({features: features });
              this.setState({matchCloth: responseJson.matchCloth });
            })
            .catch((error) => {
              console.error(error);
            })});    
  }

  upload = async() => {
    this.setState({disabledn: true});
    var itemId = "";
    await firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/items/').push(this.state.features).then((data)=>{
        //success callback
        itemId = data.getKey();
        console.log('data ----------------=-=' , itemId);
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
    const response = await fetch(this.props.uri);
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
      xhr.open('GET', this.props.uri, true);
      xhr.send(null);
    });
    var ref = firebase.storage().ref('images').child(firebase.auth().currentUser.uid+itemId+'.png');
    const res = await ref.put(blob);
    await firebase
            .storage()
            .ref("images")
            .child(firebase.auth().currentUser.uid+itemId+".png")
            .getDownloadURL()
            .then(url => {
              this.setState({imgurl: url})
              firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/items/'+itemId).update({
                img_url: url,
                type: this.props.type
              }, function(error){
                if (error) {
                  // The write failed...
                } else {
                  // Data saved successfully!
                }                
              })
            });
    this.props.navigation.goBack();
    this.setState({disabledn: false});
    this.props.navigation.navigate('ItemMatch',{imgUrl: this.state.imgurl, clothID: itemId});

  } 



  componentDidMount() {
    firebase.database().ref('serverAddr/').once('value', function (snapshot) {
      var addr = 'http://'+snapshot.val()+'/match/clothInfo/';
      console.log("hehe",addr);
      this.fetchFeatures(addr);
    }.bind(this));
    // this.fetchFeatures("http://3.85.207.50/match/clothInfo/");

  }
  render() {
    var img = require('../statics/pictures/cloth-detail-bg.png');
  	return(
      <View style={{backgroundColor: '#F7F7F7', flex:0}}>
        <View style={styles.container}>
          <View style = {styles.backgroundContainer}>
            <Image source = {img} resizeMode = 'cover' style = {styles.backdrop} />
          </View>
          <View style = {styles.overlay}>
            <Image style = {styles.logo} source = {{uri: this.props.uri}} />
          </View>
        </View>
        <View style={{height:20}}/>
        <View style={{ width: '90%', left: 20}}>
          <ListItem
            rightAvatar={      <Icon.Ionicons
              onPress={this.editLabels}
              name='ios-create'
              size={26}
              style={{ marginBottom: -3 }}
              color='white'
            />}
            containerStyle={{backgroundColor: '#FF9696'}}
            titleStyle={{fontFamily: 'open-sans-regular', color: 'white', fontSize: 20, fontWeight: 'bold' }}
            roundAvatar
            title='Labels'
          />
          { 
            Object.keys(this.state.features).map((key,i) => (
            <ListItem
              key={i}
              title={<View style={{flexDirection:'row'}}><Text style={{fontFamily: 'open-sans-regular',flex:1,fontSize:14,height:20, width: 200, textAlign: 'left', alignSelf: 'stretch'}}>{key}</Text><Text style={{fontFamily: 'open-sans-regular',flex:1,fontSize:14,height:20, width: 200, textAlign: 'right', alignSelf: 'stretch'}}>{this.state.features[key]}</Text></View>}
            />
          ))}
        </View>
        <View style={{height:20}}/>
        <View style={{flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop:20,
                      marginBottom: 20}}>
          <TouchableHighlight
            disabled={this.state.disabledBtn}
            style={styles.cancel}
            onPress={() => this.props.navigation.goBack()}
            underlayColor='#fff'>
              <Text style={{fontFamily: 'open-sans-regular',color:'gray', textAlign:'center', fontSize: 16, fontWeight: 'bold'}}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            disabled={this.state.disabledBtn}
            style={styles.submit}
            onPress={() => this.upload()}
            underlayColor='#fff'>
              <Text style={{fontFamily: 'open-sans-regular',color:'#fff', textAlign:'center', fontSize: 16, fontWeight: 'bold'}}>Add</Text>
          </TouchableHighlight>
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
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
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