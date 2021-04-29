import algoliasearch from "algoliasearch/lite";
// import { findResultsState } from "react-instantsearch-dom/server";

const indexName = "cubason_dev";

const searchClient = algoliasearch(
  "213339JCYS",
  process.env.NEXT_PUBLIC_ALGOLIA_CUBASON_DEV
);

export { indexName, searchClient };
