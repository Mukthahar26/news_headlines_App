import {Text} from 'react-native';
import React from 'react';
import styles from './styles';

type props = {
  children: any;
  style?: any;
  onPress?: any;
  noOfLines?: number;
};

const AppText = ({children, onPress, style, noOfLines}: props) => {
  return (
    <Text
      numberOfLines={noOfLines}
      onPress={onPress}
      style={[styles.textStyle, style]}>
      {children}
    </Text>
  );
};

export default AppText;
