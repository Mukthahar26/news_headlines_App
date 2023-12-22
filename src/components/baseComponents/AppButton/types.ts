import React from 'react';
import {TextStyle, ViewStyle} from 'react-native';

export type AppButtonProps = {
  onPress: any;
  style: ViewStyle;
  textStyle: TextStyle;
  children: React.ReactNode;
  testID?: string;
  isDisabled?: boolean;
};
