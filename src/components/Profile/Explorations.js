import React from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

import PropTypes from 'prop-types';

export default function Explorations({ explorations }) {
  return (
    <div className="profile__explorations animate__animated animate__fadeIn">
      {explorations.length > 0
        ? explorations.map((exploration) => (
          <div className="profile__explorations__item" key={exploration.id}>
            <img src={exploration.image_url} className="explorations__item__thumbnail" alt={`Aperçu de l'exploration ${exploration.username}`} />
            <span className="profile__explorations__item__name">{exploration.name}</span>

            <Link type="button" className="profile__explorations__item__button button --secondary" to={`/exploration/${exploration.id}`}>
              <span className="icon is-small"><FaInfoCircle /></span>
              <span>Informations</span>
            </Link>
          </div>
        ))
        : <h2>Aucune exploration trouvée</h2>}
    </div>
  );
}

Explorations.propTypes = {
  explorations: PropTypes.array.isRequired,
};
