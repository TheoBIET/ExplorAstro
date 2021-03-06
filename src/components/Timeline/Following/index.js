import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Following({ following }) {
  return (
    <div className="timeline-right__follow animate__animated animate__fadeInRight">
      <h3 className="timeline-right__follow__title">Vos amis</h3>
      <ul className="timeline-right__follow__list">
        {following.map((follow) => {
          const {
            id, firstname, lastname, username, avatar_url: avatar,
          } = follow;
          return (
            <Link key={id} to={`/profile/${id}`}>
              <li>
                <img src={avatar ?? 'https://s3-explorastro.s3.us-east-2.amazonaws.com/1630856500282-313912004.jpg'} alt={username} />
                <p>{firstname} {lastname}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

Following.propTypes = {
  following: PropTypes.array.isRequired,
};
