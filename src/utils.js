export function extractQueryParams() {
  const params = {};
  if (window.location.search) {
    const search = window.location.search.slice(1);
    search.split('&').forEach(part => {
      const [key, value] = part.split('=');
      if (!params[key]) {
        params[key] = value;
      } else {
        params[key] = [].concat(params[key], value);
      }
    });
  }
  return params;
}
