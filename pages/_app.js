import "../styles/globals.css";
import { ProvideAuth } from "../context/useAuth";
import { ProvideLogin } from "../components/authHooks/useLogin";
import { ProvideErrorNotification } from "../context/useGlobalErrorNotification";
import { ProvideUploadPicture } from "../context/useProvidePicture";
import { InstantSearch } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
//
const indexName = "cubason_dev";
const searchClient = algoliasearch(
  "213339JCYS",
  process.env.NEXT_PUBLIC_ALGOLIA_CUBASON_DEV
);

//
function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Nav /> */}
      <ProvideAuth>
        <ProvideLogin>
          <ProvideErrorNotification>
            <ProvideUploadPicture>
              <InstantSearch indexName={indexName} searchClient={searchClient}>
                <Component {...pageProps} />
              </InstantSearch>
            </ProvideUploadPicture>
          </ProvideErrorNotification>
        </ProvideLogin>
      </ProvideAuth>
    </>
  );
}

export default MyApp;
