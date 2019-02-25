import React from 'react';
import firebase from "firebase";

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const UserImg = () => (
  <AuthUserContext.Consumer>
    {authUser => {
        firebase
          .storage()
          .ref("images")
          .child(authUser.uid+'.png')
          .getDownloadURL()
          .then(url => {
        return (
              <div>
                  <h1> {authUser.uid} </h1>
                <img src={url}/>
              </div>)})
      
    }}
  </AuthUserContext.Consumer>
);

const ImgUrl = filename => {
	return firebase
	  .storage()
	  .ref("images")
	  .child(filename)
	  .getDownloadURL()
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserImg);