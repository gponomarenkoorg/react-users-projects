import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { getUser, request } from './api/api';
import './App.scss';

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);
  // const [selectedUserId, selectUserId] = useState(0);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Mounted');

    getUser('defunkt')
      // eslint-disable-next-line no-console
      .then(res => console.log(res));

    // request('GET /users/')
    //   .then(res => setUsers(res));
    // console.log(users);
  }, []);

  return (
    <h1>Users list</h1>
  );
};

export default App;
