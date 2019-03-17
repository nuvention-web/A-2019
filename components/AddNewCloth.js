import * as React from 'react';
import { View, TouchableHighlight, ScrollView, FlatList, StyleSheet, Dimensions, Image, ImageBackground, Text, CameraRoll } from 'react-native';				  	
import { Button,  } from 'react-native-elements';

export default class AddNewCloth extends React.Component {
	goBack = ()=>{
		console.log(123);
	}
  render() {
  	return(
  		<View style={{backgroundColor: '#F7F7F7',flex: 1}}>
		  	<View style={styles.imageContainer}>
		  		<Image style={styles.imageBg} source={require('../statics/pictures/cloth-bg.png')} />
		  		<Image style={styles.imageCloth} source={require('../statics/pictures/top7.png')} />
		  		<Image style={styles.tag1} source={require('../statics/pictures/btag1.png')} />
		  		<Image style={styles.tag2} source={require('../statics/pictures/btag2.png')} />
		  		<Image style={styles.tag3} source={require('../statics/pictures/btag3.png')} />
		  		<Image style={styles.tag4} source={require('../statics/pictures/btag4.png')} />

			</View>
			<View style={{marginTop:290, flex:0}}>
		  		<Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 10}}> Possible Matches</Text>
		  		<ScrollView horizontal= {true}
				    decelerationRate={0}
				    snapToInterval={200} //your element width
				    snapToAlignment={"center"}>
		  			<Image style={{marginLeft: 20, flex:1, height:150, width: 200}} source={require('../statics/pictures/combo1.png')} />
		  			<Image style={{marginLeft: 20, flex:1, height:150, width: 200}} source={require('../statics/pictures/combo2.png')} />

		  		</ScrollView>
	  		</View>
	  		<View style={{flex: 1,
					    flexDirection: 'row',
					    alignItems: 'center',
					    justifyContent: 'center',
					    marginTop:20,
					    marginBottom: 20}}>
<TouchableHighlight
  style={styles.cancel}
  onPress={() => this.props.goHome()}
  underlayColor='#fff'>
    <Text style={{color:'gray', textAlign:'center', fontSize: 16, fontWeight: 'bold'}}>Cancel</Text>
</TouchableHighlight>
<TouchableHighlight
  style={styles.submit}
  onPress={() => this.props.goHome()}
  underlayColor='#fff'>
    <Text style={{color:'#fff', textAlign:'center', fontSize: 16, fontWeight: 'bold'}}>Add</Text>
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
		position: 'absolute',
		top: 0,
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