import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
import UserImg from './userImg';

class Album extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    upperURL: "",
    pantsURL: "",
    clothnumber: 0,
  };

 
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({image: this.state.clothnumber+1});
    this.updateClothNumber();
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  getNewFileName = () => {
    return firebase.auth().currentUser.uid + this.state.clothnumber.toString() + '.png';
  };

  updateClothNumber = () =>{
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/image').once('value').then(snapshot => {
      console.log(snapshot.val());
      this.setState({clothnumber: snapshot.val()});
    });
  };

  generateMatching = () => {
    if (this.state.clothnumber<2){
      alert('Not enough clothes');
    }
    else{
      var upper = Math.floor(Math.random()*this.state.clothnumber);
      var pants = -1;
      while (pants<0){
        var tmp = Math.floor(Math.random()*this.state.clothnumber);
        if (tmp!=upper) {pants = tmp;}
      }
      firebase
        .storage()
        .ref("images")
        .child(firebase.auth().currentUser.uid + upper.toString() + '.png')
        .getDownloadURL()
        .then(url => this.setState({ upperURL: url }));
      console.log(this.state.upperURL);
      firebase
        .storage()
        .ref("images")
        .child(firebase.auth().currentUser.uid + pants.toString() + '.png')
        .getDownloadURL()
        .then(url => this.setState({ pantsURL: url }));
      }
  };

  componentDidMount() {
    firebase
      .storage()
      .ref("images")
      .child("upper.png")
      .getDownloadURL()
      .then(url => this.setState({ upperURL: url }));
    firebase
      .storage()
      .ref("images")
      .child("pants.gif")
      .getDownloadURL()
      .then(url => this.setState({ pantsURL: url }));
    this.updateClothNumber();
  }

 
  render() {
    return (
      <div>
        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        {this.state.upperURL && <img src={this.state.upperURL} height="250px"/>}
        {this.state.pantsURL && <img src={this.state.pantsURL} height="250px"/>}
        <h1>number of clothes you have: {this.state.clothnumber}</h1>
        <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}>
          Upload my cloth
          <FileUploader
            hidden
            accept="image/*"
            storageRef={firebase.storage().ref('images')}
            filename={this.getNewFileName()}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </label>
        <br/>
        <br/>
        <br/>
        <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}} onClick={this.generateMatching}>
          Show Me What To Wear
        </label>
      </div>
    );
  }
}
 
export default Album;