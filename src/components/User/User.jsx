/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { request } from '../../api/api';
import { RepoList } from '../RepoList/RepoList';

export const User = ({
  selectedLogin,
  isUserSelected,
  clearUser,
}) => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [userError, setUserError] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUser = async() => {
      try {
        const loadedUser = await request(`/users/${selectedLogin}`);

        setUser(loadedUser);
      } catch (errorUser) {
        setUserError(`Loading repos error: ${errorUser.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [selectedLogin]);

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

  if (!repos.length) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">User&apos;s repos loading...</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">User&apos;s datas loading...</span>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="alert alert-primary" role="alert">
        <h1>{`Error: ${userError}`}</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-primary" role="alert">
        <h1>{`Error: ${error}`}</h1>
      </div>
    );
  }

  if (repos.length) {
    return (
      <>
        <h3>User details here</h3>
        {!isUserSelected
          ? (
            <div className="alert alert-primary" role="alert">
              <h1>User is not selected</h1>
            </div>
          )
          : (
            <>
              <div>

                <div className={cn({
                  'card mb-3 user-block': true,
                  active: isUserSelected,
                })}
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
                          {user.email && `email ${user.email}`}
                        </p>
                        <p className="card-text">
                          {user.location && `location: ${user.location}`}
                        </p>
                        <p className="card-text">
                          {user.created_at
                          && `Join Date: ${user.created_at.slice(0, 10)}`}
                        </p>
                        <p className="card-text">
                          {user.followers && `${user.followers} Followers`}
                        </p>
                        <p className="card-text">
                          {user.location && `Following ${user.following}`}
                        </p>
                        <div>
                          <p className="card-text">
                            <small className="text-muted">
                              {user.bio && `User's biography: ${user.bio}`}
                            </small>
                          </p>
                          <button
                            type="button"
                            className="btn"
                            onClick={clearUser}
                          >
                            Clear
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <RepoList
                  repos={repos}
                  selectedLogin={selectedLogin}
                  isUserSelected={isUserSelected}
                />
              </div>
            </>
          )
        }
      </>
    );
  }
};
