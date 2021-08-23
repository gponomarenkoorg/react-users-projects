import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './RepoList.scss';

export const RepoList = ({ repos, selectedLogin, isUserSelected }) => {
  const [queryRepo, setInputRepo] = useState('');
  const filteredRepos = repos.filter(repo => repo.name.includes(queryRepo));
  const handleQueryRepo = (event) => {
    setInputRepo(event.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            name="queryRepo"
            placeholder="Search for Repos"
            value={queryRepo}
            onChange={handleQueryRepo}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              Find Repos
            </span>
          </div>
        </div>

        <div className="container">
          <h3>Repo List</h3>
          {filteredRepos.map(repo => (
            <div
              className={cn({
                'card mb-3 repo-block': true,
                active: isUserSelected,
              })}
              key={repo.id}
            >
              <button
                type="button"
                onClick={
                  // eslint-disable-next-line max-len
                  () => window.open(`https://github.com/${selectedLogin}/${repo.name}`, '_blank')
                }
              >
                <div className="row no-gutters">
                  <div className="col-md-4 p-3">
                    <h5 className="card-title">
                      {`${repo.name}`}
                    </h5>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <p className="card-text">
                        {`Forks: ${repo.forks_count}`}
                      </p>
                      <p className="card-text">
                        {`Stars: ${repo.stargazers_count}`}
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

RepoList.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  selectedLogin: PropTypes.string.isRequired,
  isUserSelected: PropTypes.bool.isRequired,
};