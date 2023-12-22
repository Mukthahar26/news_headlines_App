import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchGetRequest} from '../../axios/axiosInstance';
import Config from 'react-native-config';
import {NEWSARTICLESURL} from '../../axios/endpoints';

type paramsType = {
  API_OFFSET: number;
  API_LIMIT: number;
  LOCAL_PER_BATCH: number;
};
export const fetchRemoteHeadlines = createAsyncThunk<any, paramsType>(
  '/fetchRemoteHeadlines',
  async _ => {
    const response = await fetchGetRequest(
      `${Config.BASE_URL}${NEWSARTICLESURL}&apiKey=${Config.API_KEY}`,
    );
    return response.data;
  },
);
