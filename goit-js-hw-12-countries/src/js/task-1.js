import '@pnotify/core/dist/BrightTheme.css'
const debounce = require('lodash.debounce');


import countryCardTpl from '../templates/country.hbs';
import countriesList from '../templates/countries-list.hbs';
import refsList from './refs.js';
import './fetchCountries.js';

const refs = refsList();
const { alert, notice, info, success, error } = require('@pnotify/core');




refs.searchForm.addEventListener('input', debounce(onSearch, 500))



function fetchCountries (searchCountry) {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchCountry}`).then(response => response.json());
}; 
    
function onSearch(e) {
  
    const form = e.target;
    // console.log(form)
    const searchQuery = form.value;

    fetchCountries(searchQuery)
    .then(renderCountryCard)
     .catch (error => {
      console.log(error)
     })
};



function renderCountryCard(country) {
    if (country.length === 1) {
        const markup = countryCardTpl(country);
        console.log(markup);
        refs.cardContainer.innerHTML = markup;
        
    } else if (country.length < 10 && country.length !==1) {
        const markupList = countriesList(country)
        refs.cardContainer.innerHTML = markupList;
        return markupList;
    } else {   
        refs.cardContainer.innerHTML = "";
        return notice("Too many matches found. Please enter a more specific query!");
      
    }
};