import React from 'react';
import {FlatList, View} from 'react-native';
import {HeadlineType} from '../../../redux/slicers/headlineSlicer';
import AppText from '../../baseComponents/AppText';
import HeadlinesItem from '../headlinesItem';
import styles from './styles';
import EmptyState from '../emptyState';
import {TextLabel} from '../../../constants/constants';

type Props = {
  data: HeadlineType[];
  onEndReached?: () => void;
};

const HeadlinesList = ({data, onEndReached}: Props) => {
  const renderItem = ({item}: {item: HeadlineType}) => {
    return <HeadlinesItem item={item} />;
  };

  return (
    <View>
      <AppText style={styles.heading}>{TextLabel.TODAYS_HEADLINES}</AppText>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          onEndReached={onEndReached}
        />
      ) : (
        <EmptyState message={TextLabel.HEADLINES_NOT_AVAILABLE} />
      )}
    </View>
  );
};

export default HeadlinesList;
