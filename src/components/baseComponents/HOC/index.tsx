import React, {useEffect, useState} from 'react';
import {addEventListener} from '@react-native-community/netinfo';
import {debounce} from '../../../utilities/utils';

const HOC = (OriginalComponent: React.ComponentType<any>) => {
  const UpdatedComponent = (props: any) => {
    const [isConnected, setIsConnected] = useState<boolean | null>(true);

    useEffect(() => {
      const unsubscribe = addEventListener(state => {
        isComesOnline.start(state.isConnected);
      });
      return () => unsubscribe();
    }, []);

    const isComesOnline = debounce(state => {
      setIsConnected(state[0]);
    }, 300);

    return <OriginalComponent {...props} isNetConnected={isConnected} />;
  };

  return UpdatedComponent;
};

export default HOC;
