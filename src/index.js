import debounce from '../node_modules/lodash.debounce';
import { defaults, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/BrightTheme.css';
import './main.scss';
import countriesAPI from './js/fetchCountries';
import getRefs from './js/getRefs';
import onlyCountryTemplate from './templates/only-country.hbs';
import listCountriesTemplate from './templates/list-countries.hbs';

defaults.delay = 1000;

const refs = getRefs();

refs.inputSearch.addEventListener('input', debounce(searchCountry, 500));

function searchCountry() {
  refs.container.innerHTML = '';
  if (refs.inputSearch.value !== '') {
    return countriesAPI
      .fetchCountries(refs.inputSearch.value)
      .then(data => renderCountries(data))
      .catch((err) => {
        console.warn(err)
      })
  }
}

function renderCountries(data) {
  if (data.status === 404) {
    return error({
      text: 'Unfortunately the country name you entered is not correct!',
    });
  }
  if (data.length === 1) {
    onlyCountry(data);
    success({
      text: ' Your query is correct!',
    });
  }
  if (data.length > 2 && data.length <= 10) {
    listCountries(data);
    info({
      text: ' For more detailed information please specify the query!',
    });
  }
  if (data.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
}

function onlyCountry(data) {
  const textContent = onlyCountryTemplate(data);
  refs.container.insertAdjacentHTML('afterbegin', textContent);
}

function listCountries(data) {
  const textContent = listCountriesTemplate(data);
  refs.container.insertAdjacentHTML('afterbegin', textContent);
}
