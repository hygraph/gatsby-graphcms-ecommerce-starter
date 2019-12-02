exports.buildLocalePath = ({
  locale: { default: isDefault = false, path },
  type,
  identifier,
}) =>
  isDefault
    ? `/${type}/${identifier}`
    : `/${path.toLowerCase()}/${type}/${identifier}`;
