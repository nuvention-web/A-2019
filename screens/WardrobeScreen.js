import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import WardrobeTab from '../components/WardrobeTab';
import AddNewCloth from '../components/AddNewCloth';

export default class WardrobeScreen extends React.Component {
  static navigationOptions = {
    title: 'Wardrobe'
  };
  state = {
    newUpload: false,
    uploadSuccess: false
  }

  switchContent = () => {
    this.setState({newUpload: true});
  }

  uploadSuccess = () =>{
    this.setState({newUpload: false, uploadSuccess: true})
  }

  render() {
    if (this.state.newUpload){
      return(<AddNewCloth goHome={this.uploadSuccess}/>)
    }
    else{
      if (this.state.uploadSuccess){
        return (
            <WardrobeTab data={[{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}, {key: 6}, {key: 7}]} switch={this.switchContent}/>      
        );
      }
      else{
        return (
            <WardrobeTab data={[{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}, {key: 6}]} switch={this.switchContent}/>      
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
