export default (connector: any) => ({
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
});
