import React from 'react';
import {View, FlatList, Dimensions, ViewStyle} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';
import Loader from '../loader';
import AppText from '../AppText';

const {height} = Dimensions.get('window');

type props = {
  children: any;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  headerName?: string;
  isBackRequired?: boolean;
  mainContainerStyle?: ViewStyle;
  isScrollRequired: boolean;
  isHeaderRequired?: boolean;
  isIgnoreBottomBar?: boolean;
  loading?: boolean;
  isCartIconRequired: boolean;
  headerStyle?: ViewStyle;
  badgeCount: number;
};
const ContainerView = ({
  children,
  containerStyle,
  mainContainerStyle,
  isHeaderRequired,
  isScrollRequired,
  isIgnoreBottomBar,
  loading,
}: props) => {
  const renderContent = () => <View>{children}</View>;

  const renderLoader = () => {
    if (loading) {
      return <Loader />;
    } else {
      return (
        <>
          {isHeaderRequired && <AppText>We can add header UI</AppText>}
          {isScrollRequired ? (
            <FlatList
              data={[{}]}
              contentContainerStyle={[
                styles.container,
                containerStyle,
                {paddingBottom: isIgnoreBottomBar ? scale(80) : scale(10)},
              ]}
              showsVerticalScrollIndicator={false}
              renderItem={renderContent}
              keyExtractor={(_, index) => index.toString()}
            />
          ) : (
            <View style={[styles.container, {height: height}, containerStyle]}>
              {children}
            </View>
          )}
        </>
      );
    }
  };
  return (
    <SafeAreaView
      style={[
        styles.mainContainerStyle,
        loading && styles.loading,
        mainContainerStyle,
      ]}>
      {renderLoader()}
    </SafeAreaView>
  );
};

ContainerView.defaultProps = {
  headerName: '',
  isScrollRequired: true,
  isBackRequired: true,
  isHeaderRequired: true,
  isIgnoreBottomBar: false,
  loading: false,
  isCartIconRequired: true,
  badgeCount: 0,
};

export default ContainerView;
