import React from "react";
import ReactDOM from "react-dom";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider } from "@elastic/react-search-ui";
import { App } from "./App";
import { Customizer, mergeStyles, loadTheme } from "office-ui-fabric-react";
import * as serviceWorker from "./serviceWorker";

const connector = new AppSearchAPIConnector({
  searchKey: "search-371auk61r2bwqtdzocdgutmg",
  engineName: "search-ui-examples",
  hostIdentifier: "host-2376rb"
});

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

ReactDOM.render(
  <Customizer settings={{}}>
    <SearchProvider
      config={{
        apiConnector: connector,
        searchQuery: {
          result_fields: {
            title: {
              raw: {}
            },
            nps_link: { raw: {} },
            states: { raw: {} },
            description: { snippet: { size: 100, fallback: true } }
          },
          facets: {
            states: { type: "value", size: 30 },
            acres: {
              type: "range",
              ranges: [
                { from: -1, name: "Any" },
                { from: 0, to: 1000, name: "Small" },
                { from: 1001, to: 100000, name: "Medium" },
                { from: 1000001, name: "Large" }
              ]
            }
          }
        }
      }}
    >
      <App />
    </SearchProvider>
  </Customizer>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
