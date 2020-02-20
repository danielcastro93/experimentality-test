const API_KEY = 'AIzaSyA-4fLiIp0tOTpBOyiCelMi5jcuXfh7Si0';

const endpoints = {
  videos: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6',
  selectedVideo: 'https://www.googleapis.com/youtube/v3/videos?part=snippet'
};

const appendParams = (endpoint, params) => {
  if (!params) return endpoint;

  const query = Object.keys(params).map(paramKey => {
    let value;

    if (paramKey === 'fields') value = `items(${params[paramKey].join(',')})`;
    else value = encodeURIComponent(params[paramKey]);

    return `${encodeURIComponent(paramKey)}=${value}`;
  }).join('&');

  return `${endpoint}&${query}&key=${API_KEY}`;
};

const getEndpoint = (resource, params) => appendParams(endpoints[resource], params);

export const fetchResource = async (resource, params, setLoading, setValue, processResponse, callback) => {
  setLoading(true);

  const response = await fetch(getEndpoint(resource, params));
  let parsedResponse = await response.json();

  if (processResponse) parsedResponse = processResponse(parsedResponse);

  setLoading(false);
  setValue(parsedResponse);

  if (callback) callback(parsedResponse);
};