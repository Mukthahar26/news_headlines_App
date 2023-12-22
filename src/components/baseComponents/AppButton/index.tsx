import React from 'react';
import {Pressable, ActivityIndicator, ViewStyle, TextStyle} from 'react-native';
import {scale} from 'react-native-size-matters';
import AppText from '../AppText';
import {AppButtonProps} from './types';
import {colorThemes} from '../../../themes/colors';

const AppButton = ({
  onPress,
  style,
  textStyle,
  children,
  isDisabled,
  testID,
  ...otherProps
}: AppButtonProps) => {
  const onClickPress = () => {
    if (!isDisabled) {
      onPress();
    }
  };

  const onClickLongPress = () => {
    if (!isDisabled) {
      onPress();
    }
  };

  return (
    <Pressable
      accessibilityLabel={testID}
      testID={testID}
      disabled={isDisabled}
      style={[style as ViewStyle]}
      onPress={onClickPress}
      onLongPress={onClickLongPress}
      {...otherProps}>
      {children}
    </Pressable>
  );
};

AppButton.defaultProps = {
  onPress: () => {},
  onLongPress: () => {},
  style: {},
  textStyle: {},
  children: null,
  text: undefined,
  isDisabled: false,
  disabledStyle: {},
};

export default AppButton;
