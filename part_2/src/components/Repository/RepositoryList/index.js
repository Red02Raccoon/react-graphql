import React from "react";

import RepositoryItem from "../RepositoryItem";

import "./style.css";

const RepositoryList = ({ repositories }) => {
  return (
    <div className="RepositoryContainer">
      {repositories.edges.map(({ node }) => (
        <div key={node.id} className="RepositoryItem">
          <RepositoryItem {...node} />
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
