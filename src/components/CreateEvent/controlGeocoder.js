/* eslint-disable no-restricted-globals */
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder';
import L from 'leaflet';
import PropTypes from 'prop-types';

export default function ControlGeocoder({ coordLocation }) {
  const map = useMap();

  useEffect(() => {
    let geocoder = L.Control.Geocoder.arcgis();
    if (typeof URLSearchParams !== 'undefined' && location.search) {
      // parse /?geocoder=nominatim from URL
      const params = new URLSearchParams(location.search);
      const geocoderString = params.get('geocoder');
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      }
      else if (geocoderString) {
        console.warn('Unsupported geocoder', geocoderString);
      }
    }
    L.Control.geocoder({
      query: '',
      placeholder: 'adresse... ',
      defaultMarkGeocode: false,
      geocoder,
      collapsed: false,
      position: 'topleft',
    })
      .on('markgeocode', (e) => {
        const latlng = e.geocode.center;
        console.log(latlng);
        console.log(e.geocode.bbox);
        coordLocation(latlng);
        L.marker(latlng)
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, []);

  return null;
}

ControlGeocoder.propTypes = {
  coordLocation: PropTypes.func.isRequired,

};