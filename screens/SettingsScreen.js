import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from './../Firebase.js';
export default class SettingsScreen extends React.Component {
  state = { email: '', password: '', errorMessage: null }
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
    console.log(firebase.auth().currentUser.uid)
  }
  render() {
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
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    )
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