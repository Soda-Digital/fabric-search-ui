import * as React from "react";
import { Text, Checkbox } from "office-ui-fabric-react";

type StateFacetProps = {
  facets: any;
  filters: any;
  addFilter: Function;
  removeFilter: Function;
};

export function StateFacet(props: StateFacetProps) {
  let { facets, addFilter, removeFilter, filters } = props;
  return (
    <>
      {facets.states &&
        facets.states.map((state: any, index: number) => (
          <StateFacetGroup
            key={index}
            {...{ filters, addFilter, removeFilter, state }}
          />
        ))}
    </>
  );
}

type StateFacetGroupProps = {
  filters: any;
  addFilter: Function;
  removeFilter: Function;
  state: any;
};

function StateFacetGroup(props: StateFacetGroupProps) {
  let { state, filters, addFilter, removeFilter } = props;
  return (
    <>
      <Text>States</Text>
      {state.data &&
        state.data.map((v: any, index: number) => {
          return (
            <StateFacetItem
              key={index}
              {...{ v, filters, addFilter, removeFilter }}
            />
          );
        })}
    </>
  );
}

type StateFacetItemProps = {
  addFilter: Function;
  removeFilter: Function;
  filters: any;
  v: any;
};

function StateFacetItem(props: StateFacetItemProps) {
  let { addFilter, removeFilter, filters, v } = props;

  function onChangeHandler(
    event: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
    checked?: boolean | undefined
  ) {
    if (checked) {
      addFilter("states", v.value);
    } else {
      removeFilter("states", v.value);
    }
  }

  let label = `${v.value} (${v.count})`;

  let checked = filters.findIndex(findFilter(v.value)) !== -1;

  return (
    <Checkbox checked={checked} label={label} onChange={onChangeHandler} />
  );
}

function findFilter(value: string) {
  return (f: any) => f.field === "states" && f.values.includes(value);
}
