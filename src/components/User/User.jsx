import React, { useEffect, useState } from 'react';
import { request } from '../../api/api';
import { RepoList } from '../RepoList/RepoList';

export const User = ({
  selectedLogin,
  isUserSelected,
  selectedUser,
  clearUser,
}) => {
  const [repos, setRepos] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadRepos = async() => {
      try {
        const loadedRepos = await request(`/users/${selectedLogin}/repos`);

        setRepos(loadedRepos);
      } catch (errorRepos) {
        setError(`Loading repos error: ${errorRepos.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadRepos();
  }, [selectedLogin]);

  if (!repos) {
    return (
      <h2>User&apos;s repos are loading...</h2>
    );
  }

  if (isLoading) {
    return (
      <h2>User&apos;s datas loading...</h2>
    );
  }

  if (repos) {
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
            <>
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

              <div>
                <RepoList repos={repos} selectedLogin={selectedLogin} />
              </div>
            </>
          )
        }
      </>
    );
  }
};
