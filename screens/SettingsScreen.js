import React from 'react';
import { StyleSheet, Linking, Text, TextInput, View, Button } from 'react-native';
import firebase from './../Firebase.js';
export default class SettingsScreen extends React.Component {
  state = { signup: false,email: '', password: '', errorMessage: null }
  handleLogout = () =>{
    firebase
   .auth()
   .signOut();
   this.setState({signup: false});
    this.props.navigation.navigate('Landing');
  }
  handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { this.setState({ error: '', loading: false }); })
            .catch(() => {
              //Login was not successful, let's create a new account
              firebase.auth().createUserWithEmailAndPassword("loginfailure@error", "errorerror")
                  .then(() => { this.setState({ error: '', loading: false }); })
                  .catch(() => {
                      this.setState({ error: 'Authentication failed.', loading: false });
                   });
            });
  }
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
          firebase.database().ref('users/'+res.user.uid).set({
              email: this.state.email,
              image: 0
          })
          this.setState({signup: false})
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    if (this.state.user){
      return (<View><Text>You are signed in as {this.state.user.email}</Text><Button title="Logout" onPress={this.handleLogout} />
                <Text>
                  <Text>You are very welcome to give us feedback </Text>
                  <Text style={{color: 'blue'}} onPress={()=> Linking.openURL('https://www.surveymonkey.com/r/9JHQPLX')}>here</Text>
                </Text>
              </View>)
    }
    else{
      if (this.state.signup){
        return(
          <View style={styles.container}>
            <Text>SignUp</Text>
            {this.state.errorMessage &&
              <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
              </Text>}
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <Button title="Sign Up" onPress={this.handleSignUp} />   
            </View>       
          )
      }
      else{
        return (
          <View style={styles.container}>
            <Text>Login</Text>
            {this.state.errorMessage &&
              <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
              </Text>}
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <Button title="Login" onPress={this.handleLogin} />
            <Button
              title="Don't have an account? Sign Up"
              onPress={() => this.setState({ signup: true})}
            />
          </View>
        )
      }
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})