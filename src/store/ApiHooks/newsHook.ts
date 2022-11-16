import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import {ConfigApiRequest} from '../../providers/newsProvider';

export const fetchAllNews = createAsyncThunk('news/allNews', async () => {
  const options = ConfigApiRequest();
  const response: AxiosResponse = await axios.request(options);
  const data = await response.data;
  return data.articles;
});
