'use strict';

const cheerio = require('cheerio')
const request = require('request')
const pollenUrl = 'http://pollenandmold.stlouisco.com/Pollen_Day_Text.aspx'

function fetchHTMLfromUrl(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, html) => {
      // Start with some terse rejections.
      // Doesn't really matter what they are - if it isn't perfect html, we can't use it.
      if (error) reject(error);
      if (response.statusCode !== 200) reject(response);
      // All set. Return the pollen record.
      resolve(html)
    });
  });
}

function createPollenObjectFromHtml(html) {
  // create our cheerio instance
  const $ = cheerio.load(html)
  const newRecord = {}

  // sort through the mostly plaintext table.
  $('tr').each(function (index, element){
    //get every table data.
    const data = $(this).find('td');

    //the first item has the label
    const label = data.eq(0).text().trim();

    //the second item has the value.
    const value = parseInt(data.eq(1).text().trim(), 10);

    // eliminate non numeric cruft.
    if (label && !isNaN(value)) {
      newRecord[label] = value
    }
  })

  return newRecord
}

const fetchPollenRecord = () =>
  fetchPollenText(url)
  .then(createPollenObjectFromHtml)
  .catch(data => {
    // for now, we'll just return the error.
    // Once IFTTT is set up, we can call an SMS service.
    return data;
  })


module.exports = {
  fetchPollenRecord,
}
