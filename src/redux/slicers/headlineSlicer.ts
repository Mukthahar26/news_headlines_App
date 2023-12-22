import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {fetchRemoteHeadlines} from '../fetchAPIs/fetchRemoteHeadlines';
import {isArray} from '../../utilities/utils';
import logger from '../../utilities/logger';

export type HeadlineType = {
  title: string;
  author: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  pinned?: boolean;
  source: {
    id: string;
    name: string;
  };
};

type initialStateType = {
  articles: HeadlineType[];
  cachedArticles: HeadlineType[];
  pinnedArticles: HeadlineType[];
  totalAPIArticlesize: number;
  loading?: boolean;
  error?: string | null;
};

type cacheStorageStype = {
  cache: {
    articles: HeadlineType[];
    pinnedArticles: HeadlineType[];
  };
  API_OFFSET: number;
  API_LIMIT: number;
  LOCAL_PER_BATCH: number;
};

const initialState: initialStateType = {
  articles: [],
  cachedArticles: [],
  pinnedArticles: [],
  totalAPIArticlesize: 0,
  loading: false,
  error: null,
};

const headlinesSlice = createSlice({
  name: 'headlines',
  initialState: initialState,
  reducers: {
    addMoreHeadlines: (state, action: PayloadAction<HeadlineType[]>) => {
      state.articles = [...action.payload, ...state.articles];
    },
    deleteHeadline: (state, action: PayloadAction<HeadlineType>) => {
      const filtered = state.articles.filter(
        item => item.description !== action.payload.description,
      );
      const pinnedFiltered = state.pinnedArticles.filter(
        item => item.description !== action.payload.description,
      );
      state.pinnedArticles = pinnedFiltered;
      state.articles = filtered;
    },
    pinHeadline: (state, action: PayloadAction<any>) => {
      if (isArray(action.payload)) state.pinnedArticles = action.payload;
      else state.pinnedArticles = [action.payload, ...state.pinnedArticles];
    },
    unPinHeadline: (state, action: PayloadAction<HeadlineType>) => {
      const filtered = state.pinnedArticles.filter(
        item => item.description !== action.payload.description,
      );
      state.pinnedArticles = filtered;
    },
    setCacheStorage: (state, action: PayloadAction<cacheStorageStype>) => {
      const articles = action.payload.cache.articles;
      const pinnedArticles = action.payload.cache.pinnedArticles;
      const LOCAL_LIMIT = action.payload.LOCAL_PER_BATCH;
      state.cachedArticles = articles;
      state.pinnedArticles = pinnedArticles;
      state.articles = articles.slice(0, LOCAL_LIMIT);
      state.totalAPIArticlesize = articles.length;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRemoteHeadlines.pending, state => {
        state.articles = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRemoteHeadlines.fulfilled, (state, action) => {
        let articles: HeadlineType[] = [];
        if (isArray(action.payload.articles))
          articles = action.payload.articles;

        if (articles.length) {
          const API_OFFSET = action.meta.arg.API_OFFSET;
          const API_LIMIT = action.meta.arg.API_LIMIT;
          const localBatch = action.meta.arg.LOCAL_PER_BATCH;
          const cachedArticles = articles.slice(API_OFFSET, API_LIMIT);
          state.articles = articles.slice(0, localBatch);
          state.cachedArticles = cachedArticles;
          state.totalAPIArticlesize = articles.length;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRemoteHeadlines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const {
  addMoreHeadlines,
  deleteHeadline,
  pinHeadline,
  unPinHeadline,
  setCacheStorage,
} = headlinesSlice.actions;
export default headlinesSlice.reducer;
