import React from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet, Text, Image } from 'react-native';
import WardrobeTab from '../components/WardrobeTab';
import AddNewCloth from '../components/AddNewCloth';
import ClothFeatures from '../components/ClothFeatures';
import firebase from './../Firebase.js';

export default class WardrobeScreen extends React.Component {
  static navigationOptions = {
    title: 'Wardrobe'
  };
  componentDidMount() {
    // firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/items').once('value', function (snapshot) {
    //   var dictArray = snapshot.val()
    //   var arrayLength = dictArray.length;
    //   var array_bottoms = new Array();
    //   for (var i = 1; i < arrayLength; i++) {
    //       if (dictArray[i]["type"]=='bottoms'){
    //         array_bottoms.push(dictArray[i]["img_url"]);
    //       }
    //   }
    //   this.setState({trousersUrl: array_bottoms});
    //   console.log(this.state.trousersUrl);
    // }.bind(this)); 
  }
  state = {
    newUpload: false,
    uploadSuccess: false,
    loading: false,
    uploadurl: '',
//     trousersUrl: [
//   "https://firebasestorage.googleapis.com/v0/b/profashion.appspot.com/o/images%2Fwhite.png?alt=media&token=592700e5-8eb0-44c7-b04f-94c012cceb7c",
//   "https://firebasestorage.googleapis.com/v0/b/profashion.appspot.com/o/images%2Fblue.png?alt=media&token=44b579c6-7b38-4f63-904a-f0e8e5e9af05",
//   "https://firebasestorage.googleapis.com/v0/b/profashion.appspot.com/o/images%2Ftrousers_gray.png?alt=media&token=43c9e3ec-16ad-4a75-9eab-d2b4b896aa69",
//   "https://firebasestorage.googleapis.com/v0/b/profashion.appspot.com/o/images%2Forange.png?alt=media&token=3ee3dcdd-59b9-4f62-9155-620c0d19662f",
//   "https://firebasestorage.googleapis.com/v0/b/profashion.appspot.com/o/images%2Fblack.png?alt=media&token=c7d5fdbf-a6d8-4b62-9ca2-22675a57e5f3",
// ]
  }

  setUploadUrl = (url) =>{
    this.setState({uploadurl: url});
  }
  switchContent = (uri, type) => {
    // this.setState({loading:true});
    // setTimeout(()=>{this.setState({newUpload: true,loading: false})},
    //   4000
    // );
    // console.log("UUURRRIII", type);
    this.setState({loading: false});
    this.props.navigation.navigate('SingleItem',{test:"hahaha", uri:uri, type:type});
  }
  startLoading = () =>{
    this.setState({loading: true});
  }

  uploadSuccess = () =>{
    this.setState({newUpload: false, uploadSuccess: true})
  }

  render() {
    if (this.state.loading){
      return(<View style={{top: 300,justifyContent: 'center'}}><ActivityIndicator size="large" color='#FF9696' /></View>)
    }
    if (this.state.newUpload){
      return(<ClothFeatures goHome={this.uploadSuccess} url={this.state.uploadurl}/>)
    }
    else{
      if (this.state.uploadSuccess){
        return (
            <WardrobeTab uploadurl={this.uploadurl} data={[{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}, {key: 6}, {key: 7}]} switch={this.switchContent}/>      
        );
      }
      else{
        return (
            <WardrobeTab navigation={this.props.navigation} startLoading={this.startLoading} uploadurl={this.uploadurl} data={[{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}, {key: 6}, {key: 7}]} switch={this.switchContent}/>      
        );
      }
    }
  }
}


const styles = StyleSheet.create({
  imageCloth: {
    flex: 1,
    width: 300,
    resizeMode: 'contain',
    marginLeft: 40
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
