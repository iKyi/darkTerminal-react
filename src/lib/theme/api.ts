export function getStrapiURL(path = "") {
  return `${
    process.env.REACT_APP_STRAPI_URL || "http://localhost:1337"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path: string) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  if (data.data && data.data.attributes) {
    return data.data.attributes;
  } else if (data.data) {
    return data.data;
  } else {
    return data;
  }
}
