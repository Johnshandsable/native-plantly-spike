const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');

const bundleData = require('../modules/bundledata');

// const clientData = [];

router.get('/', (req, res) => {
  const searchToken = 'narrowleaf'; // Will be coming from client-side
  const searchState = 'MO'; // Will be coming from req.user.location

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
      async function clientData() {
        return await bundleData(dbRes.data.results);
      }
      res.send(dbRes.data.results);
    })
    .catch((err) => {
      console.error('POST to NatureServe - error occurred', err);
      res.sendStatus(500);
    });
});

module.exports = router;
