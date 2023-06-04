export const formatExpires = (expires: Date) => {
  return Intl.DateTimeFormat(undefined, {dateStyle: 'short', timeStyle: 'short'}).format(expires);
};
