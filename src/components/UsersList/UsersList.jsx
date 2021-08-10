import React, { useState } from 'react';
import cn from 'classnames';
import './UsersList.scss';

export const UsersList = ({ users, selectUser, clearUser, isUserSelected }) => {
  const [queryUser, setInputUser] = useState('');
  const filteredUsers = users.filter(user => user.login.includes(queryUser));
  const handleQueryUser = (event) => {
    setInputUser(event.target.value);
    clearUser();
  };

  return (
    <>
      <div className="container">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            name="queryUser"
            placeholder="Search for Users"
            value={queryUser}
            onChange={handleQueryUser}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              Find User
            </span>
          </div>
        </div>

        <div className="container">
          <h3>Users List</h3>
          {filteredUsers.map(user => (
            <div
              className={cn({
                'card mb-3 user-block': true,
                active: isUserSelected,
              })}
              key={user.id}
            >
              <button
                type="button"
                onClick={() => selectUser(user.login)}
              >
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={user.avatar_url}
                      className="card-img"
                      alt="avatar"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{user.login}</h5>
                      <p className="card-text">
                        {`Repo: ${user.public_repos}`}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))
          }
        </div>
      </div>
    </>
  );
};
