import * as React from "react";
import { Stack, Text } from "office-ui-fabric-react";
import { StateFacet } from "./StateFacet";

type SidebarProps = {
  facets: any;
  addFilter: Function;
  removeFilter: Function;
  filters: any;
};

export function Sidebar(props: SidebarProps) {
  let { facets, addFilter, removeFilter, filters } = props;
  return (
    <Stack tokens={{ childrenGap: 15, padding: 16 }} style={{ width: "300px" }}>
      <Text variant="large">Sidebar</Text>
      <StateFacet {...{ facets, addFilter, removeFilter, filters }} />
    </Stack>
  );
}
