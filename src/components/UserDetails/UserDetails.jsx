import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { request } from '../../api/api';

export const UserDetails = ({ login }) => {
  const [number, setNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async() => {
      try {
        const loadedUser = await request(`/users/${login}`);

        setNumber(loadedUser.public_repos);
      } catch (userError) {
        setError(`Loading repos error: ${userError.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [login]);

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
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

  return (
    <>
      {`Repos: ${number}`}
    </>
  );
};

UserDetails.propTypes = {
  login: PropTypes.string.isRequired,
};
