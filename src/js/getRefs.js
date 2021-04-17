const { defaults } = require('@pnotify/core');

export default function getRefs() {
  return {
    inputSearch: document.querySelector('#searchCountry'),
    container: document.querySelector('.containerCountry'),
  };
}
