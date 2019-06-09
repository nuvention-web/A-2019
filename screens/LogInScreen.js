import { View, Button, TextInput, ActivityIndicator, ScrollView, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import React from 'react';
import firebase from './../Firebase.js';


export default class LogInScreen extends React.Component {
  state = {
    loading:false
  }
  handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => { 
          this.setState({ error: '', loading: false });
          this.props.navigation.navigate('Main');
         })
        .catch(() => {
          this.setState({ error: 'Authentication failed.', loading: false });
        });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height:'15%'}}/>
        <Text style={styles.title}>
          Log in
        </Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <View style={{height:'20%'}}/>
        <Text style={styles.email}>Email</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholderTextColor='#F7DBDA'
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <Text style={styles.email}>Password</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholderTextColor='#F7DBDA'
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View style={{height:'20%'}}/>
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.signUp}
            onPress={() => this.handleLogin()}
            underlayColor='#fff'>
            <View style={styles.button}>
              <Text style={{fontFamily: 'gilroy-bold',color:'#3C4D9F', textAlign:'center', fontSize: 20, fontWeight: 'bold'}}>Confirm</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.logIn}
            onPress={() => this.props.navigation.navigate('Landing')}
            underlayColor='#fff'>
            <View style={styles.button}>
              <Text style={{fontFamily: 'gilroy-bold',color:'#F7DBDA', textAlign:'center', fontSize: 20, fontWeight: 'bold'}}>Cancel</Text>
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
    backgroundColor: '#3C4D9F',
    flexDirection:'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'gilroy-bold',
    color: '#F46755',
    alignSelf: 'flex-start',
    left: 23,
    fontSize: 30,
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