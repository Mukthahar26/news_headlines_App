import React from 'react';
import {View} from 'react-native';
import styles from '../../blockcomponents/headlinesList/styles';

const UnderLine = ({style}: any) => {
  return <View style={[styles.container, style]} />;
};

export default UnderLine;
