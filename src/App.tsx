import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import Home from './screens/home';
import ErrorBoundaries from './components/baseComponents/errorBoundaries';
import {store} from './redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppText from './components/baseComponents/AppText';
import globalStyles from './globalStyles';
import HOC from './components/baseComponents/HOC';
import {TextLabel} from './constants/constants';

const App = ({isNetConnected}: any) => {
  const [showHome, setShowHome] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      setShowHome(true);
    }, 3000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <ErrorBoundaries>
          {!isNetConnected && (
            <AppText style={globalStyles.offlineLabel}>
              {TextLabel.NO_NET_CONNECTION}
            </AppText>
          )}
          {showHome && <Home isNetConnected={isNetConnected} />}
        </ErrorBoundaries>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default HOC(App);
