import React from 'react';
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to='/user'>유저</Link>
        </li>
        <li>
          <Link to='/feed'>피드</Link>
        </li>
      </ul>
    </div>
  )
}

export default HomePage