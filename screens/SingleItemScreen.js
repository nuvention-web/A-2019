import ClothFeatures from '../components/ClothFeatures';
import { View, Button, ActivityIndicator, ScrollView, StyleSheet, Text, Image } from 'react-native';
import React from 'react';


export default class SingleItemScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'New item uploaded!' ,
      headerBackTitle: 'Back'
    };
  };
  state = {
    loading:false
  }

  componentDidMount() {
    // setTimeout(()=>{this.setState({loading: false})},
    //   10000
    // );    
  }
  render() {
    const {goBack} = this.props.navigation;
    if (this.state.loading){
      return(<View style={{top: 300,justifyContent: 'center'}}><ActivityIndicator size="large" color='#FF9696' /></View>)
    }
    return (
      <ScrollView>
        <ClothFeatures uri={this.props.navigation.state.params.uri}
                       type={this.props.navigation.state.params.type} 
                       navigation={this.props.navigation}/>
      </ScrollView>
     )
   }
}

