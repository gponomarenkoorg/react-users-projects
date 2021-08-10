import React, { useEffect, useState } from 'react';
import { request } from './api/api';
import './App.scss';
import { User } from './components/User';
import { UsersList } from './components/UsersList';

// const keyUserLogin = 'userlogin';

const App = () => {
  const [users, setUsers] = useState(null);
  const [selectedLogin, setLogin] = useState('');
  const [isUserSelected, setUserSelected] = useState(false);
  const [selectedUser, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const storageLogin = JSON.parse(window.localStorage.getItem(keyUserLogin));

  useEffect(() => {
    const loadUsers = async() => {
      try {
        setIsLoading(true);

        const loadedUsers = await request('/users');

        setUsers(loadedUsers);
      } catch (errorUsers) {
        setError(errorUsers.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
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

  if (isLoading) {
    return (
      <h1>Users list is loading...</h1>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Users list</h1>
          {!users
            ? (
              <p>
                Users list is loading...
              </p>
            )
            : (
              <UsersList
                users={users}
                selectUser={selectUser}
                clearUser={clearUser}
              />
            )
            }
        </div>
        <div className="col">
          {!isUserSelected
            ? <p>User is not selected</p>
            : (
              <User
                selectedLogin={selectedLogin}
                selectLogin={setLogin}
                isUserSelected={isUserSelected}
                selectedUser={selectedUser}
                selectUser={selectUser}
                clearUser={clearUser}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default App;
