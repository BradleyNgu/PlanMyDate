import React, { useContext, useEffect, useState } from 'react';
import { PlacesContext } from './PlacesContext';

function DateSuggestions() {
  const { places } = useContext(PlacesContext);
  const [suggestions, setSuggestions] = useState('');

  useEffect(() => {
    const fetchSuggestions = async () => {
      const placeNames = places.map(place => place.name).join(', ');

      const response = await fetch('/api/get-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Suggest date ideas for these places: ${placeNames}`,
          max_tokens: 150
        })
      });

      const data = await response.json();
      setSuggestions(data.choices[0].text);
    };

    if (places.length > 0) {
      fetchSuggestions();
    }
  }, [places]);

  return (
    <div>
      {suggestions && <p>{suggestions}</p>}
    </div>
  );
}

export default DateSuggestions;
