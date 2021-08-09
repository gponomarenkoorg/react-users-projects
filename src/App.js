import React, { useEffect, useState } from 'react';
import localUsers from './api/localUsers.json';
import { getUser, request } from './api/api';
import './App.scss';

const App = () => {
  const [users, setUsers] = useState(localUsers);
  const [selectedLogin, selectLogin] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Mounted');

    getUser('defunkt')
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
