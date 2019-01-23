import React from 'react';

export default ({ errors }) => {
  return (
    <p>
      <strong>Something went wrong:</strong>
      {errors.map(error => error.message).join(' ')}
    </p>
  )
}