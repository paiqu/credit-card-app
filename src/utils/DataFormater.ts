export function formatExpiry(value: string) {
  // remove non-digit first
  const data = value.replace(/\D+/g, "");

  if (data.length >= 3) {
    return `${data.slice(0, 2)}/${data.slice(2, 4)}`;
  }

  return data;
}

export function capitalizeString(value: string) {
  // eslint-disable-next-line
  return value.
      split(' ')
      .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(' ');
}