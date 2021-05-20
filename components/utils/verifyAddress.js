import SmartyStreetsSDK from "smartystreets-javascript-sdk";
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usStreet.Lookup;

// for Server-to-server requests, use this code:
// let authId = process.env.NEXT_PUBLIC_SMARTY_AUTHID;
// let authToken = process.env.NEXT_PUBLIC_SMARTY_TOKEN;
// const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
let key = process.env.NEXT_PUBLIC_SMARTY_WEBSITE_KEY;
let hostname = process.env.NEXT_PUBLIC_SMARTY_AUTH_REFERER;
const credentials = new SmartyStreetsCore.SharedCredentials(key, hostname);
let clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials);
// .withLicenses(["us-rooftop-geocoding-cloud"]);
let client = clientBuilder.buildUsStreetApiClient();

export const verifyAddress = (values) => {
  if (values) {
    let lookup1 = new Lookup();
    lookup1.inputId = "0"; // Optional ID from your system
    lookup1.addressee = `${values.firstName} ${values.lastName}`;
    lookup1.street = values.street;
    lookup1.street2 = "";
    lookup1.secondary = "";
    lookup1.urbanization = ""; // Only applies to Puerto Rico addresses
    lookup1.city = values.city;
    lookup1.state = values.state;
    lookup1.zipCode = values.zip;
    lookup1.maxCandidates = 3;
    lookup1.match = "invalid"; // "invalid" is the most permissive match,
    // this will always return at least one result even if the address is invalid.
    // Refer to the documentation for additional MatchStrategy options.

    // NOTE: batches are not supported when using SharedCredentials.
    let batch = new SmartyStreetsCore.Batch();
    batch.add(lookup1);

    function handleSuccess(response) {
      response.lookups.map((lookup) => console.log(lookup.result));
    }

    function handleError(err) {
      console.log(err);
    }

    return client.send(batch).then(handleSuccess).catch(handleError);
  }
};
