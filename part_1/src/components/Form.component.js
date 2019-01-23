import React from 'react';

export default ({handleSubmit, handleChange, path}) => {
  return (
  <form onSubmit={handleSubmit}>
    <label htmlFor="url">
      Show open issues for https://github.com/
    </label>
    <input
      id="url"
      type="text"
      onChange={handleChange}
      style={{ width: '300px' }}
      value={ path }
    />
    <button type="submit">Search</button>
  </form>
  )
}