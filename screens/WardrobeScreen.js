import React from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet, Text, Image } from 'react-native';
import WardrobeTab from '../components/WardrobeTab';
import AddNewCloth from '../components/AddNewCloth';
import ClothFeatures from '../components/ClothFeatures';

export default class WardrobeScreen extends React.Component {
  static navigationOptions = {
    title: 'Wardrobe'
  };
  state = {
    newUpload: false,
    uploadSuccess: false,
    loading: false,
  }

  switchContent = () => {
    this.setState({loading:true});
    setTimeout(()=>{this.setState({newUpload: true,loading: false})},
      4000
    );
  }

  uploadSuccess = () =>{
    this.setState({newUpload: false, uploadSuccess: true})
  }

  render() {
    if (this.state.loading){
      return(<View style={{top: 300,justifyContent: 'center'}}><ActivityIndicator size="large" color='#FF9696' /></View>)
    }
    if (this.state.newUpload){
      return(<ClothFeatures goHome={this.uploadSuccess}/>)
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
