import * as React from 'react';
import { View, Linking, TouchableHighlight, ScrollView, FlatList, StyleSheet, Dimensions, Image, ImageBackground, Text, Alert } from 'react-native';				  	
import { Button,  } from 'react-native-elements';
import firebase from './../Firebase.js';

		  		// <Image style={styles.tag1} source={require('../statics/pictures/btag1.png')} />
		  		// <Image style={styles.tag2} source={require('../statics/pictures/btag2.png')} />
		  		// <Image style={styles.tag3} source={require('../statics/pictures/btag3.png')} />
		  		// <Image style={styles.tag4} source={require('../statics/pictures/btag4.png')} />
export default class AddNewCloth extends React.Component {
  goBack = ()=>{
  	console.log(123);
  }
  state = {
    price: '',
    serverAddr: '',
    imgurl: "",
    features: {'color': ' '},
    matchCloth: "",
    recommendPurchase: ""
  }
  componentDidMount() {
    firebase.database().ref('serverAddr/').once('value', function (snapshot) {
      var addr = 'http://'+snapshot.val()+'/match/purchaseRecommend/';
      this.fetchRecommendations(addr);
    }.bind(this));

  }

  _showAlert = () => {
    Alert.alert(
      'Deletion',
      'Are you sure to delete this item?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'DELETE', onPress: () => this.handleDeletion(), style: 'destructive'},
      ],
      { cancelable: false }
    )
  }

  handleDeletion = () => {
  	const reference = 'users/' + firebase.auth().currentUser.uid + '/items';
  	firebase.database().ref(reference).child(this.props.clothID).remove();
  	const fileName = firebase.auth().currentUser.uid + this.props.clothID + ".png";
    firebase
      .storage()
      .ref("images")
      .child(fileName)
      .delete();
    this.props.navigation.goBack();




  }
	
	fetchRecommendations = (addr)=>{
      var jsonBody = {
        'dbkey': firebase.auth().currentUser.uid,
        'img_url': this.props.imgUrl,
        'clothID': this.props.clothID

      };
      fetch(addr, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
      }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({matchCloth: responseJson.matchCloth.img_url, recommendPurchase: responseJson.recommendPurchase.clothImg, purchaseLink: responseJson.recommendPurchase.clothUrl, matchColor: responseJson.matchCloth.color, price: responseJson.recommendPurchase.price });
          })
          .catch((error) => {
            console.error(error);
          });    
  }
  render() {
  	return(
  		<View style={{backgroundColor: '#F7F7F7',flex: 0}}>
		  	<View style={styles.imageContainer}>
		  		<Image style={styles.imageBg} source={require('../statics/pictures/cloth-bg.png')} />
		  		<Image style={styles.imageCloth} source={{uri: this.props.imgUrl}} />


			</View>
          <Text style={{fontFamily: 'open-sans-regular', left:20, fontSize: 24, fontWeight: 'bold', marginBottom: 10}}> Wear it with {this.state.matchColor}</Text>
			<View style={{flex:0, alignItems: 'center'}}>
		  		<ScrollView horizontal= {true}
				    decelerationRate={0}
				    snapToInterval={200} //your element width
				    snapToAlignment={"center"}>
            <Image style={{resizeMode: 'cover', flex:1, height:200, width: 150}} source={{uri: this.props.imgUrl}} />
		  			<Image style={{resizeMode: 'cover',flex:1, height:200, width: 150}} source={{uri: this.state.matchCloth}} />

		  		</ScrollView>
	  		</View>
        <View style={{height:20}}/>
          <Text style={{fontFamily: 'open-sans-regular', left:20, fontSize: 24, fontWeight: 'bold', marginBottom: 10}}> You may also like</Text>
			<View style={{flex:0, alignItems: 'center'}}>
		  		<ScrollView horizontal= {true}
				    decelerationRate={0}
				    snapToInterval={200} //your element width
				    snapToAlignment={"center"}>
		  			<Image style={{resizeMode: 'cover', flex:1, height:200, width: 150}} source={{uri: this.props.imgUrl}} />
            <TouchableHighlight
            onPress={() => Linking.openURL(this.state.purchaseLink)}>
            <ImageBackground style={{opacity: 0.8, resizeMode: 'cover',flex:1, height:200, width: 150}} source={{uri: this.state.recommendPurchase}}>
               <View style={{opacity: 1,position: 'absolute', top: 180, left: 50, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                 <Text style={{fontFamily: 'open-sans-regular', fontWeight:'bold',}}>{this.state.price}</Text>
               </View>
            </ImageBackground>
            </TouchableHighlight>

		  		</ScrollView>
	  		</View>
        <View style={{height:20}}/>

        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.logIn}
            onPress={this._showAlert}
            underlayColor='#fff'>
            <View style={styles.button}>
              <Text style={{fontFamily: 'gilroy-bold',color:'#F7DBDA', textAlign:'center', fontSize: 20, fontWeight: 'bold'}}>Delete</Text>
            </View>
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
	buttons: {
	width: '90%',
	flex: 1,
	justifyContent: 'flex-end',
	marginBottom: 36,
	alignSelf: 'center'
	},  
	button: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
	},  
	logIn:{
	height: 50,
	backgroundColor:'#3C4D9F',
	borderRadius: 40,
	},
});