import React from 'react';

import Repository from "./Repository.component";
import OrganizationDesc from "./OrganizationDesc.component";
import Errors from "./Errors.component";

const Organization = ({ organization, errors, onFetchMoreIssues, onStarRepository }) => {

  if (errors) {
    return <Errors errors = { errors }/>
  }

  return (
    <React.Fragment>
      <OrganizationDesc url={organization.url} name={organization.name} />
      <Repository repository={organization.repository} onFetchMoreIssues={ onFetchMoreIssues } onStarRepository={ onStarRepository }/>
    </React.Fragment>
  );
};

export default Organization