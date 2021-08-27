import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import PropTypes from 'prop-types';
import Loader from 'src/components/Loader';
// import Weather from './Weather';
import Information from './Information';
import Partcipants from './Participant';
// import Comments from './Comments';
// import Author from './Author';

export default function Exploration({ getExploration, id, exploration }) {
  useEffect(() => {
    getExploration(id);
  }, []);
  if (!exploration.id) {
    return (<Loader />);
  }
  const { geog: { coordinates } } = exploration;
  coordinates.reverse();

  return (
    <div className="Exploration">
      <section className="Exploration__main">
        <Information information={exploration} />
        <Partcipants participants={exploration} />
      </section>
      <section className="Exploration__overview">
        <div className="Exploration__overview__left">
          {/* <Weather />
          <Comments /> */}
        </div>
        <div className="Exploration__overview__map">
          <MapContainer
            // Centering on the map of france
            center={[44.840291, 2.109375]}
            zoom={6}
            maxZoom={18}
            minZoom={3}
            className="Exploration__overview__map__elem"
          >
            {/* Add layer dark map */}
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              name="tiles"
            />
            {/* Add Markers events astro on the map */}
            <Marker names="marker" position={coordinates} />
          </MapContainer>
        </div>
      </section>
      {/* TO DO: Finir l'intégrations du composant (Informations de l'autheur) @see Wireframes */}
      {/* <Author /> */}
    </div>
  );
}

Exploration.propTypes = {
  getExploration: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  exploration: PropTypes.object.isRequired,

};
