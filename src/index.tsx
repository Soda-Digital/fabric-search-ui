import React from "react";
import ReactDOM from "react-dom";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider } from "@elastic/react-search-ui";
import { App } from "./App";
import { Customizer, mergeStyles, loadTheme } from "office-ui-fabric-react";
import * as serviceWorker from "./serviceWorker";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import initalizeSearchProviderConfiguration from "./searchProviderConfiguration";

initializeIcons();

// Inject some global styles
mergeStyles({
  selectors: {
    ":global(body), :global(html), :global(#root)": {
      margin: 0,
      padding: 0,
      height: "100vh"
    }
  }
});

loadTheme({});

const searchProviderConfiguration = initalizeSearchProviderConfiguration(
  new AppSearchAPIConnector({
    searchKey: "search-371auk61r2bwqtdzocdgutmg",
    engineName: "search-ui-examples",
    hostIdentifier: "host-2376rb"
  })
);

ReactDOM.render(
  <Customizer settings={{}}>
    <SearchProvider config={searchProviderConfiguration}>
      <App />
    </SearchProvider>
  </Customizer>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
