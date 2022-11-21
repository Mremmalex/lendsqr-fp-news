import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import {AxiosGetRequest, ConfigApiRequest} from '../../providers/newsProvider';

export const fetchAllNews = createAsyncThunk('news/allNews', async () => {
  const options = ConfigApiRequest({q: 'Elon Musk'});
  const response: AxiosResponse = await axios.request(options);
  const data = await response.data;
  return data.articles;
});

export const searchForNews = createAsyncThunk(
  'news/allNews',
  async (search: string) => {
    const options = ConfigApiRequest({q: search});
    // const response: AxiosResponse = await axios.request(options);
    // const data = await response.data;
    const data = await AxiosGetRequest(options);
    return data.articles;
  },
);
