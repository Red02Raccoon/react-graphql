import React from 'react';

export default ({url, name}) => {
  return (
    <p>
      <strong>Issues from Organization:</strong>
      <a href={url}>{name}</a>
    </p>
  )
}