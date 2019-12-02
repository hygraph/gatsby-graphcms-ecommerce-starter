exports.buildLocalePath = ({
  locale: { default: isDefault = false, path: localePath },
  path,
}) => (isDefault ? `${path}` : `/${localePath.toLowerCase()}${path}`);
