import AddNewCloth from '../components/AddNewCloth';
import { View, Button, ActivityIndicator, ScrollView, StyleSheet, Text, Image } from 'react-native';
import React from 'react';


export default class ItemMatchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'See Matches' ,
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
        <AddNewCloth   clothID={this.props.navigation.state.params.clothID}
                       imgUrl={this.props.navigation.state.params.imgUrl} 
                       navigation={this.props.navigation}/>
      </ScrollView>
     )
   }
}