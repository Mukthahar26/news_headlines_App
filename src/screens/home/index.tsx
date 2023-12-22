import React, {memo, useCallback, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  ApiBatchDefaultDetails,
  EncryptStorageKeys,
  LocalBatchDefaultDetails,
} from '../../constants/constants';
import {fetchRemoteHeadlines} from '../../redux/fetchAPIs/fetchRemoteHeadlines';
import {debounce, isArray} from '../../utilities/utils';
import {
  addMoreHeadlines,
  pinHeadline,
  setCacheStorage,
} from '../../redux/slicers/headlineSlicer';
import ContainerView from '../../components/baseComponents/ContainerView';
import HeadlinesList from '../../components/blockcomponents/headlinesList';
import logger from '../../utilities/logger';
import AppText from '../../components/baseComponents/AppText';
import {View} from 'react-native';
import styles from './styles';
import {getStorage} from '../../utilities/fetchAsynstorage';

type Props = {
  isNetConnected?: boolean;
};
const Home = ({isNetConnected}: Props) => {
  const dispatch = useAppDispatch();
  const apiBatchRef = useRef(ApiBatchDefaultDetails);
  const localBatchRef = useRef(LocalBatchDefaultDetails);
  const debounceTimerRef = useRef<any>(null);
  const {
    loading,
    error,
    articles,
    cachedArticles,
    pinnedArticles,
    totalAPIArticlesize,
  } = useAppSelector(state => state.headlineSlicer);

  useEffect(() => {
    setInterval(() => {
      logger.log('time :', new Date());
    }, 1000);
  }, []);

  debounceTimerRef.current = debounce(() => {
    logger.log('timer calling: ', new Date());
    debounceTimerRef.current.clear();
    fetchCacheData();
  }, 10000);

  useEffect(() => {
    apiBatchRef.current = ApiBatchDefaultDetails;
    checkInternet();
  }, [isNetConnected]);

  useEffect(() => {
    if (isArray(articles) && articles.length > 0) {
      logger.log('cached time :', new Date());
      increaseLocalBatch();
      debounceTimerRef.current.start();
    }
  }, [articles]);

  useEffect(() => {
    if (isArray(cachedArticles) && cachedArticles.length > 0) {
      increaseAPIBatch();
    }
  }, [cachedArticles]);

  const checkInternet = async () => {
    let cache = await getStorage(EncryptStorageKeys.HEADLINESLIST);
    if (isNetConnected) {
      if (cache && cache.pinnedArticles)
        await dispatch(pinHeadline(cache.pinnedArticles));
      fetchAPI();
    } else {
      if (cache && isArray(cache.articles)) {
        const {API_OFFSET, API_LIMIT} = apiBatchRef.current;
        const {LOCAL_PER_BATCH} = localBatchRef.current;
        dispatch(
          setCacheStorage({cache, API_OFFSET, API_LIMIT, LOCAL_PER_BATCH}),
        );
      }
    }
  };

  const fetchAPI = () => {
    localBatchRef.current = LocalBatchDefaultDetails;
    const {API_OFFSET, API_LIMIT} = apiBatchRef.current;
    const {LOCAL_PER_BATCH} = localBatchRef.current;
    dispatch(fetchRemoteHeadlines({API_OFFSET, API_LIMIT, LOCAL_PER_BATCH}));
  };

  const increaseLocalBatch = () => {
    const {LOCAL_PER_BATCH, LOCAL_LIMIT} = localBatchRef.current;
    localBatchRef.current = {
      LOCAL_OFFSET: LOCAL_LIMIT,
      LOCAL_LIMIT: LOCAL_LIMIT + LOCAL_PER_BATCH,
      LOCAL_PER_BATCH,
    };
  };

  const increaseAPIBatch = () => {
    const {API_LIMIT, API_PER_BATCH} = apiBatchRef.current;
    apiBatchRef.current = {
      API_OFFSET: API_LIMIT,
      API_LIMIT: API_LIMIT + API_PER_BATCH,
      API_PER_BATCH,
    };
    if (apiBatchRef.current.API_OFFSET >= totalAPIArticlesize) {
      apiBatchRef.current = ApiBatchDefaultDetails;
    }
  };

  const fetchCacheData = () => {
    const {LOCAL_OFFSET, LOCAL_LIMIT} = localBatchRef.current;
    if (LOCAL_OFFSET < cachedArticles.length) {
      const batchedHeadlines = cachedArticles.slice(LOCAL_OFFSET, LOCAL_LIMIT);
      dispatch(addMoreHeadlines(batchedHeadlines));
    } else if (isNetConnected) {
      fetchAPI();
    }
  };

  const endReached = () => {
    logger.log('end reach time :', new Date());
    debounceTimerRef.current.clear();
    fetchCacheData();
  };

  if (error && !isArray(cachedArticles) && cachedArticles.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <AppText>{error}</AppText>
      </View>
    );
  }

  return (
    <ContainerView
      isScrollRequired={false}
      loading={loading}
      isHeaderRequired={false}>
      <HeadlinesList
        data={[...pinnedArticles, ...articles]}
        onEndReached={endReached}
      />
    </ContainerView>
  );
};

export default Home;
