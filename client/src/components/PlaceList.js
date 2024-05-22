import React, { useContext } from 'react';
import { PlacesContext } from './PlacesContext';

function PlacesList() {
  const { places } = useContext(PlacesContext);

  return (
    <ul>
      {places.map((place, index) => (
        <li key={index}>{place.name} - {place.address}</li>
      ))}
    </ul>
  );
}

export default PlacesList;
