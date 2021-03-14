const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

const axios = require('axios');

router.get('/', (req, res) => {
  const searchToken = 'narrowleaf';
  const searchState = 'MO';

  axios
    .post(
      'https://explorer.natureserve.org/api/data/speciesSearch',
      {
        criteriaType: 'species',
        textCriteria: [
          {
            paramType: 'textSearch',
            searchToken: `${searchToken}`,
            matchAgainst: 'allNames',
            operator: 'similarTo',
          },
        ],
        statusCriteria: [],
        locationCriteria: [
          {
            paramType: 'subnation',
            subnation: `${searchState}`,
            nation: 'US',
          },
        ],
        pagingOptions: {
          page: null,
          recordsPerPage: null,
        },
        recordSubtypeCriteria: [],
        modifiedSince: null,
        locationOptions: {
          origin: 'onlyNatives',
        },
        classificationOptions: {
          includeInfraspecies: false,
          includeProvisional: true,
          includeNonstandard: true,
        },
        speciesTaxonomyCriteria: [
          {
            paramType: 'informalTaxonomy',
            informalTaxonomy: 'Plants',
          },
        ],
      }
      // above info sent to NatureServe API
    )
    .then((dbRes) => {
      /*
      NatureServe Data Expected Response 

      dbRes.data.results = [] -> 
        scientificName: String
        primaryCommonName: String
        roundedGRank: String

        .speciesGlobal -> 
          kingdom: String
          phylum: String
          taxclass: String
          taxorder: String
          family: String
          genus: String
      */
      const scientificNames = ['Elodium paludosum'];

      /*
      Want an array of 20 items with 
        scientificName
        primaryCommonName 
        image_url
        phylum
        kingdom
        class
        order 
        family 
        genus 
      */
      res.send(dbRes.data.results);
    })
    .catch((err) => {
      console.error('POST to NatureServe - error occurred', err);
      res.sendStatus(500);
    });
});

router.get('/trefle', (req, res) => {
  const scientificName = 'Elodium';
  /*
    Want an array of 20 items with image_url

    dbRes.data = [] -> 
      image_url
  */
  console.log(process.env.TREFLE_API_KEY);
  axios
    .get('https://trefle.io/api/v1/species/search', {
      params: {
        q: `${scientificName}`,
        token: process.env.TREFLE_API_KEY,
      },
    })
    .then((dbRes) => {
      console.log(dbRes.data);
      // console.log(dbRes.data.image_url);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('an error occurred', err);
      res.sendStatus(500);
    });
});

module.exports = router;
