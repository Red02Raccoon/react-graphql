import React, { Component } from 'react';

import * as request from "../utils/request";

import Organization from "./Organization.component";
import Form from "./Form.component";
import Loading from "./Loading.component";

const TITLE = 'React GraphQL GitHub Client';

class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null,
  };

  componentDidMount() {
    this.onFetchFromGitHub(this.state.path);
  }

  onChange = event => {
    this.setState({ path: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.onFetchFromGitHub(this.state.path);
  };

  onFetchFromGitHub = (path, cursor) => {
    request.getIssuesOfRepository(path, cursor).then(queryResult =>
      this.setState(request.resolveIssuesQuery(queryResult, cursor))
    );
  };

  onFetchMoreIssues = () => {
    const { endCursor } = this.state.organization.repository.issues.pageInfo;

    this.onFetchFromGitHub(this.state.path, endCursor);
  };

  onStarRepository = (repositoryId, viewerHasStarred) => {
    if (!viewerHasStarred) {
      request.addStarToRepository(repositoryId).then(mutationResult =>
        this.setState(request.resolveAddStarMutation(mutationResult)),
      );
    } else {
      request.removeStarFromRepository(repositoryId).then(mutationResult =>
        this.setState(request.resolveRemoveStarMutation(mutationResult)),
      );
    }
  }

  render() {
    const { path, organization, errors } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>

        <Form handleSubmit={this.onSubmit} handleChange={this.onChange} path={path}/>

        <hr />

        {organization ? (
          <Organization
            organization={ organization }
            errors={ errors }
            onFetchMoreIssues={ this.onFetchMoreIssues }
            onStarRepository = { this.onStarRepository }
          />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default App;
