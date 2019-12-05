exports.buildLocalePath = ({ locale: { path: localePath }, path }) =>
  `/${localePath.toLowerCase()}${path}`;
