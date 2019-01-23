import React from 'react';
import { Button } from 'antd';

const Repository = ({ repository, onFetchMoreIssues, onStarRepository }) => {
  return (
    <div>
      <p>
        <strong>In Repository:</strong>
        <a href={repository.url}>{repository.name}</a>
      </p>

      <Button
        type="primary"
        onClick={() => onStarRepository(repository.id, repository.viewerHasStarred)}
        >
        {repository.stargazers.totalCount}
        {repository.viewerHasStarred ? 'Unstar' : 'Star'}
      </Button>
  
      <ul>
        {repository.issues.edges.map(issue => (
          <li key={issue.node.id}>
            <a href={issue.node.url}>{issue.node.title}</a>
            
            <ul>
              {issue.node.reactions.edges.map(reaction => (
                <li key={reaction.node.id}>{reaction.node.content}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
  
      {repository.issues.pageInfo.hasNextPage && (
        <Button onClick={onFetchMoreIssues} type="primary" >More</Button>
      )}
    </div>
  )
} 

export default Repository;
