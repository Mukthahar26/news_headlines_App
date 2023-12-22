import {Middleware, combineReducers, configureStore} from '@reduxjs/toolkit';
import headlineSlicer from './slicers/headlineSlicer';
import {setStorage} from '../utilities/fetchAsynstorage';
import {EncryptStorageKeys} from '../constants/constants';
import {isArray} from '../utilities/utils';

export const rootReducers = combineReducers({
  headlineSlicer,
});

const customMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const {cachedArticles, pinnedArticles} = store.getState().headlineSlicer;
  if (cachedArticles && isArray(cachedArticles)) {
    const cache = {
      articles: cachedArticles,
      pinnedArticles: pinnedArticles,
    };
    setStorage(EncryptStorageKeys.HEADLINESLIST, cache);
  }
  return result;
};

export const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(customMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
