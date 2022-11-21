import {AxiosResponse} from './../../node_modules/axios/index.d';
import axios from 'axios';
import perf from '@react-native-firebase/perf';

type ConfigParam = {
  q?: string;
};

type AxiosConFig = {
  method: string;
  url: string;
  params: {};
  headers: {};
};

export function ConfigApiRequest({q}: ConfigParam) {
  const options = {
    method: 'GET',
    url: 'https://newscatcher.p.rapidapi.com/v1/search_enterprise',
    params: {
      q: q,
      lang: 'en',
      sort_by: 'relevancy',
      page: '1',
      media: 'True',
    },
    headers: {
      'X-RapidAPI-Key': 'ba867d9bc9msh564177ba08146a9p1460f2jsn1d20ef3fc9ca',
      'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com',
    },
  };

  return options;
}

export async function AxiosGetRequest(config: AxiosConFig) {
  // try {
  const metric = perf().newHttpMetric(config.url, 'GET');

  metric.putAttribute('user_role', 'admin');
  await metric.start();

  const response: AxiosResponse = await axios.request(config);
  metric.setHttpResponseCode(response.status);
  metric.setResponseContentType('application/json');

  await metric.stop();
  const data = await response.data;
  return data;
  // } catch (error: any) {
  //   throw error;
  // }
}
