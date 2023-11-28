import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

import stateAndCities from '../../../constants/stateCity.json';

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp(`^${escapedValue}`, 'i');
  const crispStates = stateAndCities;

  return crispStates
    .map((el) => ({
      state: el.state,
      cities: el.cities.filter(
        ({ name: city }) => regex.test(city) && city !== 'Select Option',
      ),
    }))
    .filter((el) => el.cities.length > 0);
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion?.name}</span>;
}

function renderSectionTitle(section) {
  return <strong>{section.state}</strong>;
}

function getSectionSuggestions(section) {
  return section.cities;
}

export default function SearchBarCity({ onLocationChange, className }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (_, { newValue }) => {
    setValue(newValue?.name || newValue);
    onLocationChange(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Select City',
    value,
    onChange,
    className,
  };

  return (
    <Autosuggest
      multiSection={true}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderSectionTitle={renderSectionTitle}
      getSectionSuggestions={getSectionSuggestions}
      inputProps={inputProps}
    />
  );
}

SearchBarCity.defaultProps = {
  className: '',
};

SearchBarCity.propTypes = {
  onLocationChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
