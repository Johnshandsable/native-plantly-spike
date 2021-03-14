const axios = require('axios');

/* ----- NatureServe Data Expected Response -------

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
          ----------------
        Want an array of 20 items with 
          scientificName
          primaryCommonName 
          image_url -> Trefle API
          phylum
          kingdom
          class
          order 
          family 
          genus 
      */
async function bundleData(dataResults) {
  const clientData = [];
  for (const resultItem of dataResults) {
    /*
      bundles data in appropriate format to send back to client-side
    */
    clientData.push({
      scientificName: resultItem.scientificName,
      primaryCommonName: resultItem.primaryCommonName,
      image_url: await getImageURL(resultItem.scientificName),
      kingdom: resultItem.speciesGlobal.kingdom,
      phylum: resultItem.speciesGlobal.phylum,
      class: resultItem.speciesGlobal.taxclass,
      order: resultItem.speciesGlobal.taxorder,
      family: resultItem.speciesGlobal.family,
      genus: resultItem.speciesGlobal.genus,
    });
  }

  for (const result of clientData) {
    console.table(result);
  }

  return clientData;
}

async function getImageURL(scientificName) {
  let imageURL = '';
  await axios
    .get('https://trefle.io/api/v1/species/search', {
      params: {
        q: `${scientificName}`,
        token: process.env.TREFLE_API_KEY,
      },
    })
    .then((dbRes) => {
      /*
        object response 
        dbRes.data.data = []
      */

      for (index = 0; index < dbRes.data.data.length; index++) {
        // console.log(dbRes.data.data[index].image_url === null);
        if (dbRes.data.data[index].image_url === null) {
          continue;
        } else {
          imageURL = dbRes.data.data[index].image_url; // OK
          // console.log('before', imageURL);
        }
      }
    })
    .catch((err) => {
      console.error('an error occurred getting image', err);
    });
  // console.log('after', imageURL);
  return imageURL;
}

module.exports = bundleData;
