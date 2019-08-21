import React from "react";
import * as _ from "lodash-es";
import {
  TextField,
  Stack,
  Text,
  Link,
  FontWeights,
  DocumentCard,
  DocumentCardPreview,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardActivity,
  DocumentCardStatus,
  Spinner,
  Checkbox
} from "office-ui-fabric-react";
import { SearchProvider, WithSearch } from "@elastic/react-search-ui";
import { DefaultEffects } from "office-ui-fabric-react/lib/Styling";

// tslint:disable:jsx-no-lambda

const boldStyle = { root: {} };

export const App: React.FunctionComponent = () => {
  return (
    <WithSearch
      mapContextToProps={({
        isLoading,
        searchTerm,
        addFilter,
        removeFilter,
        filters,
        facets,
        setSearchTerm,
        results
      }: any) => ({
        searchTerm,
        addFilter,
        removeFilter,
        filters,
        facets,
        setSearchTerm,
        results,
        isLoading
      })}
    >
      {({
        facets,
        isLoading,
        filters,
        addFilter,
        removeFilter,
        searchTerm,
        setSearchTerm,
        results
      }: any) => {
        return (
          <Stack horizontal gap={15}>
            <Stack gap={15} style={{ width: "300px" }} padding={16}>
              <Text variant="large">Sidebar</Text>

              {facets.states &&
                facets.states.map((state: any) => {
                  return (
                    <>
                      <Text>States</Text>
                      {state.data &&
                        state.data.map((v: any) => {
                          return (
                            <Checkbox
                              checked={
                                filters.findIndex(
                                  (f: any) =>
                                    f.field === "states" &&
                                    f.values.includes(v.value)
                                ) !== -1
                              }
                              label={`${v.value} (${v.count})`}
                              onChange={e => {
                                let checked = (e!.target as HTMLInputElement)
                                  .checked;

                                if (checked) {
                                  addFilter("states", v.value);
                                } else {
                                  removeFilter("states", v.value);
                                }
                              }}
                            />
                          );
                        })}
                    </>
                  );
                })}

              {/* <pre>{JSON.stringify(filters, null, 4)}</pre>
              <pre>{JSON.stringify(facets, null, 4)}</pre> */}
            </Stack>
            <Stack
              horizontalAlign="center"
              verticalAlign="start"
              verticalFill
              padding={16}
              styles={{
                root: {
                  width: "100%",
                  textAlign: "center",
                  color: "#605e5c"
                }
              }}
              gap={15}
            >
              <div
                style={{
                  width: "100%"
                }}
              >
                <TextField
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
};
