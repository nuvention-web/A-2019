import { View, Button, TextInput, ActivityIndicator, ScrollView, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import React from 'react';
import firebase from './../Firebase.js';
import BasicTabs from '../components/BasicTabs';
import HomeTab from '../components/HomeTab';


export default class PickBasicItemsScreen extends React.Component {
  state = {
    loading:false,
    selected: {},
    error: "",
  }

  selectItem = (item) => {
    if (!(item.imgUrl in this.state.selected)){
      const copySelected= {...this.state.selected};
      copySelected[item.imgUrl] = item;
      this.setState({selected: copySelected});
    }
  };

  deleteItem = (item) => {
    if (item.imgUrl in this.state.selected){
      const copySelected= {...this.state.selected};
      delete copySelected[item.imgUrl];
      this.setState({selected: copySelected});
    }
  };

  handleConfirm = async() => {
    console.log(this.state.selected,Object.keys(this.state.selected).length == 0 ) 
    if (Object.keys(this.state.selected).length == 0){
      this.setState({error: "Please select at least one item"})
    }
    else {
    for (var key in this.state.selected){
      const victim = {...this.state.selected[key]};
      delete victim['style'];
      delete victim['isSelect'];
      victim['img_url'] = key;
      delete victim['imgUrl']
      await firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/items/').push(victim).then((data)=>{
          //success callback
          itemId = data.getKey();
          console.log('data ----------------=-=' , itemId);
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
      });
    }
    this.props.navigation.navigate('Main')

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:'10%'}}/>
        <Text style={styles.title}>
          Select basic essentials
        </Text>
        <Text style={styles.title}>
          you have
        </Text>
        <View style={{height:'50%', width:'100%'}}>
          <BasicTabs selectItem={this.selectItem} deleteItem={this.deleteItem} />
        </View>
        <View style={{height:'20%'}}/>
        {this.state.error.length>0 &&
        <View>
          <Text>{this.state.error}</Text>
        </View>
        }
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.signUp}
            onPress={() => this.handleConfirm()}
            underlayColor='#fff'>
            <View style={styles.button}>
              <Text style={{fontFamily: 'gilroy-bold',color:'#FFFFFF', textAlign:'center', fontSize: 20, fontWeight: 'bold'}}>Confirm</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.logIn}
            onPress={() => this.props.navigation.navigate('Landing')}
            underlayColor='#fff'>
            <View style={styles.button}>
              <Text style={{fontFamily: 'gilroy-bold',color:'#F46755', textAlign:'center', fontSize: 20, fontWeight: 'bold'}}>Cancel</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
     )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection:'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'gilroy-bold',
    color: '#F46755',
    alignSelf: 'flex-start',
    left: 23,
    fontSize: 24,
  }, 
  email: {
    fontFamily: 'gilroy-bold',
    color: '#F7DBDA',
    alignSelf: 'flex-start',
    left: 23,
    fontSize: 18,
  }, 
  password: {
    flex:1, 
    fontFamily: 'gilroy-bold',
    color: '#F7DBDA',
    alignSelf: 'flex-start',
    left: 23,
    fontSize: 18,
  }, 
  textInputContainer:{
    flex: 1,
    width: '90%',
    height: '10%',
  },
  textInput:{
    color: '#F7DBDA',
    borderColor:'#F7DBDA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize:30,
    borderRadius: 25,
  },
  buttons: {
    width: '90%',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },  
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },  
  signUp:{
    height: 50,
    backgroundColor:'#F46755',
    borderRadius: 40,
    marginBottom: 20,
  },  
  logIn:{
    height: 50,
    backgroundColor:'#FFF',
    borderRadius: 40,
  },
})