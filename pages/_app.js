import "../styles/globals.css";
// import Nav from "./nav";
import { ProvideAuth } from "../context/useAuth";
import { ProvideLogin } from "../components/authHooks/useLogin";
import { ProvideErrorNotification } from "../context/useGlobalErrorNotification";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Nav /> */}
      <ProvideAuth>
        <ProvideLogin>
          <ProvideErrorNotification>
            <Component {...pageProps} />
          </ProvideErrorNotification>
        </ProvideLogin>
      </ProvideAuth>
    </>
  );
}

export default MyApp;
