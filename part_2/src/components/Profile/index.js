import React from "react";
import { Query } from "react-apollo";

import * as allQuery from "../../config/query";

import Loading from "../Loading";
import RepositoryList from "../Repository";
import ErrorMessage from "../Error";

const Profile = () => {
  return (
    <Query query={allQuery.GET_REPOSITORIES_OF_CURRENT_USER}>
      {({ data, loading, error }) => {
        const { viewer } = data;

        if (error) {
          return <ErrorMessage error={error} />;
        }

        if (loading || !viewer) {
          return <Loading />;
        }

        return <RepositoryList repositories={viewer.repositories} />;
      }}
    </Query>
  );
};

export default Profile;
