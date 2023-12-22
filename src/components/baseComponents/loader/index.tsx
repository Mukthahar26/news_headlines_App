import {ActivityIndicator} from 'react-native';
import React from 'react';
import {colorThemes} from '../../../themes/colors';

type Props = {
  color?: string;
};
const Loader = ({color}: Props) => {
  return <ActivityIndicator color={color} size={'large'} />;
};

Loader.defaultProps = {
  color: colorThemes.blue,
};

export default Loader;
