import React, { useEffect, useState } from 'react';
import { request } from './api/api';
import './App.scss';
import { User } from './components/User';
import { UsersList } from './components/UsersList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedLogin, setLogin] = useState('');
  const [isUserSelected, setUserSelected] = useState(false);
  const [selectedUser, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  if (error) {
    return (
      <h1>{`Error: ${error}`}</h1>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Users list</h1>
          {!users.length
            ? (
              <p>
                Users list is loading...
              </p>
            )
            : (
              <UsersList
                users={users}
                selectUser={selectUser}
                isUserSelected={isUserSelected}
                clearUser={clearUser}
              />
            )
            }
        </div>
        <div className="col">
          {!isUserSelected
            ? (
              <div className="alert alert-primary" role="alert">
                <h1>User is not selected</h1>
              </div>
            )
            : (
              <User
                selectedLogin={selectedLogin}
                selectLogin={setLogin}
                isUserSelected={isUserSelected}
                user={selectedUser}
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
