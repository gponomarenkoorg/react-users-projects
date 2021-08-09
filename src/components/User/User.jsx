import React, { useEffect, useState } from 'react';

export const User = ({
  selectedLogin,
  selectLogin,
  isUserSelected,
  selectedUser,
  selectUser,
  clearUser,
}) => {
  useEffect(() => {
    console.log('Mounted');
  }, []);

  return (
    <>
      <h3>User details here</h3>
      {!isUserSelected
        ? (
          <span>
            User is not selected
          </span>
        )
        : (
          <div>
            some info about user
            User:
            {selectedUser.login}
            <button
              type="button"
              onClick={clearUser}
            >
              Clear
            </button>
          </div>
        )
      }
    </>
  );
};
