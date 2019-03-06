import React from 'react';
import PrivateHeader from './PrivateHeader';
import { Link } from 'react-router';

// Stateless functional component
export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="page-content">
          <Link to="/my-poems" className="button button--link">My Poems</Link>
          <Link to="/contests" className="button button--link">Contests</Link>
          <Link to="/add-contest" className="button button--link">Add Contest</Link>
          <Link to="/join-contest" className="button button--link">Join Contest</Link>
          <Link to="/add-poem" className="button button--link">Add Poem</Link>
      </div>
    </div>
  )
}
