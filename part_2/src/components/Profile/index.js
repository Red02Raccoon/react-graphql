import React from "react";
import { graphql } from "react-apollo";
// import { Query } from "react-apollo";
import * as allQuery from "../../config/query";

import Loading from "../Loading";
import RepositoryList from "../Repository";
import ErrorMessage from "../Error";

// HOC
const Profile = ({ data, loading, error }) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { viewer } = data;

  if (loading || !viewer) {
    return <Loading />;
  }

  return <RepositoryList repositories={viewer.repositories} />;
};

export default graphql(allQuery.GET_REPOSITORIES_OF_CURRENT_USER)(Profile);

// render props
// the team behind Apollo made the decision to favor render props instead

// const Profile = () => {
//   return (
//     <Query query={allQuery.GET_REPOSITORIES_OF_CURRENT_USER}>
//       {({ data, loading, error }) => {
//         const { viewer } = data;

//         if (error) {
//           return <ErrorMessage error={error} />;
//         }

//         if (loading || !viewer) {
//           return <Loading />;
//         }

//         return <RepositoryList repositories={viewer.repositories} />;
//       }}
//     </Query>
//   );
// };

// export default Profile;
