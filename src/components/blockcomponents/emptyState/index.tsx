import React from 'react';
import {View} from 'react-native';
import AppText from '../../baseComponents/AppText';
import styles from './styles';
import {ImageIcon} from '../../../utilities/iconPaths';

const EmptyState = ({message}: {message: string}) => {
  return (
    <View style={styles.container}>
      <ImageIcon />
      <AppText style={styles.message}>{message}</AppText>
    </View>
  );
};

export default EmptyState;
