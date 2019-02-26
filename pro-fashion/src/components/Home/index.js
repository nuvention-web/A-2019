import React from 'react';

import { withAuthorization } from '../Session';
import Album from '../Album/album.js';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>Welcome to ProFashion. See the outfit we pick for you!</p>
    <Album />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);