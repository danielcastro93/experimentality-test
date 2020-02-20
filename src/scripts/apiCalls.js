const API_KEY = 'AIzaSyCS2aUrqLXQ-6aLlfH_IU00Js6yjPGCB8U';

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

export const fetchResource = async (resource, setLoading, setValue, params, callback) => {
  setLoading(true);

  const response = await fetch(getEndpoint(resource, params));
  const parsedResponse = await response.json();

  setLoading(false);
  setValue(parsedResponse);

  if (callback) callback(parsedResponse);
};