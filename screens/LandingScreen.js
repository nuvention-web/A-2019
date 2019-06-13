import { View, Button, ActivityIndicator, ScrollView, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import React from 'react';
import firebase from './../Firebase.js';


export default class LandingScreen extends React.Component {   
  componentDidMount() {
    setTimeout(()=>{
      if (firebase.auth().currentUser){
        this.props.navigation.navigate('Main');
      }
      else{
        this.setState({loading: false});
      }

    },2000)
    }

  
  state = {
    loading:true,
    isSignUp:false,
  }
  login = () =>{
    this.props.navigation.navigate('LogIn');
  }
  signup = () =>{
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.image_top} source={require('../assets/images/landing.png')}/>
        </View>
        <View style={{height:'10%'}}>
          <Image style={styles.icon} source={require('../assets/images/icon.png')}/>
        </View>
        <View style={{height:'5%'}}/>
        <Text >
          <Text style={styles.pro}>Pro</Text>
          <Text style={styles.fashion}>Fashion</Text>
        </Text>
        <Text style={styles.text}>
          Wondering what to wear?
        </Text>
        <Text style={styles.text}>
          Here is your outfit for the day.
        </Text>
        {!this.state.loading &&
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.signUp}
            onPress={() => this.signup()}
            underlayColor='#fff'>
            <View style={styles.button}>
              <Text style={{fontFamily: 'gilroy-bold',color:'#3C4D9F', textAlign:'center', fontSize: 20, fontWeight: 'bold'}}>SIGN UP</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.logIn}
            onPress={() => this.login()}
            underlayColor='#fff'>
            <View style={styles.button}>
              <Text style={{fontFamily: 'gilroy-bold',color:'#F7DBDA', textAlign:'center', fontSize: 20, fontWeight: 'bold'}}>LOG IN</Text>
            </View>
          </TouchableHighlight>
        </View>
        }
      </View>
     )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C4D9F',
    flexDirection:'column',
    alignItems: 'center',
  },
  image_top: {
    resizeMode: 'contain',
  },  
  icon: {
    flex:1,
    resizeMode: 'contain'
  }, 
  pro: {
    fontFamily: 'gilroy-bold',
    color: '#F7DBDA',
    fontSize: 30
  }, 
  fashion: {
    fontFamily: 'gilroy-bold',
    color: '#F46755',
    fontSize: 30
  }, 
  text: {
    fontFamily: 'gilroy-bold',
    color: '#F7DBDA',
    fontSize: 18,
    marginTop: 20
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
    backgroundColor:'#F7DBDA',
    borderRadius: 40,
    marginBottom: 20,
  },  
  logIn:{
    height: 50,
    backgroundColor:'#3C4D9F',
    borderRadius: 40,
  },
})