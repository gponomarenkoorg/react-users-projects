import React, { useEffect, useState } from 'react';
import localUsers from './api/localUsers.json';
import { getUser, request } from './api/api';
import './App.scss';
import { User } from './components/User';
import { UsersList } from './components/UsersList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedLogin, setLogin] = useState('');
  const [isUserSelected, setUserSelected] = useState(false);
  const [selectedUser, setUser] = useState(null);

  useEffect(() => {
    setUsers(localUsers);
    console.log(users);
  }, []);

  const selectUser = (userLogin) => {
    setLogin(userLogin);
    setUserSelected(true);
    setUser(users.find(user => user.login === userLogin));
  };

  const clearUser = () => {
    setLogin('');
    setUserSelected(false);
    setUser(null);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <h1>Users list</h1>
        {users.length
          ? (
            <UsersList users={users} selectUser={selectUser} />
          )
          : 'Todo list is loading...'
          }
      </div>
      <div className="App__content">
        <User
          selectedLogin={selectedLogin}
          selectLogin={setLogin}
          isUserSelected={isUserSelected}
          selectedUser={selectedUser}
          selectUser={selectUser}
          clearUser={clearUser}
        />
      </div>
    </div>

  );
};

export default App;
