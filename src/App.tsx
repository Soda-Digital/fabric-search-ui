import React from "react";
import { TextField, Stack, Text, Spinner } from "office-ui-fabric-react";
import { WithSearch } from "@elastic/react-search-ui";
import { DefaultEffects } from "office-ui-fabric-react/lib/Styling";
import { Sidebar } from "./Sidebar";

type SearchContext = {
  facets: any;
  isLoading: boolean;
  filters: any;
  addFilter: Function;
  removeFilter: Function;
  searchTerm: string;
  setSearchTerm: Function;
  results: any;
};

export function App() {
  return (
    <WithSearch
      mapContextToProps={(context: SearchContext) => ({ ...context })}
    >
      {(props: SearchContext) => {
        let {
          facets,
          isLoading,
          filters,
          addFilter,
          removeFilter,
          searchTerm,
          setSearchTerm,
          results
        } = props;

        return (
          <Stack horizontal tokens={{ childrenGap: 15 }}>
            <Sidebar {...{ facets, addFilter, removeFilter, filters }} />
            <Stack
              horizontalAlign="center"
              verticalAlign="start"
              verticalFill
              styles={{
                root: {
                  width: "100%",
                  textAlign: "center",
                  color: "#605e5c"
                }
              }}
              tokens={{ childrenGap: 15, padding: 16 }}
            >
              <div
                style={{
                  width: "100%"
                }}
              >
                <TextField
                  styles={{
                    wrapper: {
                      borderRadius: "50%"
                    },
                    field: {
                      padding: "0 1rem"
                    },
                    fieldGroup: {
                      borderRadius: "1rem"
                    }
                  }}
                  style={{}}
                  onChange={e =>
                    setSearchTerm((e!.target as HTMLInputElement).value)
                  }
                  value={searchTerm}
                  type="text"
                />
                {isLoading && (
                  <div style={{ padding: 16 }}>
                    <Spinner />
                  </div>
                )}
                {!isLoading &&
                  results.map((r: any) => (
                    <div
                      key={r.id.raw}
                      style={{
                        width: "100%",
                        textAlign: "left"
                      }}
                    >
                      <Stack
                        style={{
                          boxShadow: DefaultEffects.elevation8,
                          margin: "16px 0",
                          padding: 16
                        }}
                      >
                        <Text variant="medium">{r.title.raw}</Text>
                        <Text variant="small">{r.states.raw[0]}</Text>
                      </Stack>
                    </div>
                  ))}
              </div>
            </Stack>
          </Stack>
        );
      }}
    </WithSearch>
  );
}
