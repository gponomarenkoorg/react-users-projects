import React, { useEffect, useState } from 'react';

export const UsersList = ({ users, selectUser }) => {
  const [queryUser, setInputUser] = useState('');
  const filteredUsers = users.filter(user => user.login.includes(queryUser));
  const handleQueryUser = (event) => {
    setInputUser(event.target.value);
  };

  return (
    <div>

      <div>
        {`Input: `}
        <input
          name="queryUser"
          value={queryUser}
          onChange={handleQueryUser}
        />
      </div>

      <div>
        <ul>
          <strong>UsersList container</strong>
          <p />
          {filteredUsers.map(user => (
            <li
              key={user.id}
              onClick={() => selectUser(user.login)}
            >
              {`ID: ${user.id}, ${user.login}`}
            </li>
          ))
          }
        </ul>
      </div>

    </div>
  );
};
