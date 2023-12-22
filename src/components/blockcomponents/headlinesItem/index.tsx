import React, {useRef} from 'react';
import {Image, View, ViewStyle} from 'react-native';
import {
  HeadlineType,
  deleteHeadline,
  pinHeadline,
  unPinHeadline,
} from '../../../redux/slicers/headlineSlicer';
import AppText from '../../baseComponents/AppText';
import Card from '../../baseComponents/card';
import ImageViewer from '../imageViewer';
import styles from './styles';
import {confirmAlert, getDateFormat} from '../../../utilities/utils';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AppButton from '../../baseComponents/AppButton';
import {colorThemes} from '../../../themes/colors';
import {useAppDispatch} from '../../../redux/hooks';

type Props = {
  item: HeadlineType;
};

const HeadlinesItem = ({item}: Props) => {
  const dispatch = useAppDispatch();
  const swipeableRef = useRef<any>(null);
  const {description, publishedAt, title, urlToImage, pinned} = item;

  const closeSwipeable = () => {
    if (swipeableRef.current) swipeableRef.current.close();
  };

  const deleteItem = () => {
    confirmAlert({
      message: 'Would you like to delete the headline?',
      onPressYes: () => {
        dispatch(deleteHeadline(item));
        closeSwipeable();
      },
    });
  };

  const pin = () => {
    confirmAlert({
      message: 'Would you like to pin the headline?',
      onPressYes: () => {
        dispatch(pinHeadline({...item, pinned: true}));
        closeSwipeable();
      },
    });
  };

  const unPin = () => {
    confirmAlert({
      message: 'Would you like to unpin the headline?',
      onPressYes: () => dispatch(unPinHeadline(item)),
    });
  };

  const renderLeftActions = () => {
    return (
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={pin}
          style={
            [styles.button, {backgroundColor: colorThemes.green}] as ViewStyle
          }>
          <AppText style={styles.label}>PIN</AppText>
        </AppButton>
        <AppButton style={styles.button} onPress={deleteItem}>
          <AppText style={styles.label}>DELETE</AppText>
        </AppButton>
      </View>
    );
  };

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderLeftActions}>
      <Card style={styles.container}>
        <ImageViewer style={styles.image} uri={urlToImage} />
        <View style={styles.details}>
          {pinned && (
            <AppButton onPress={unPin} style={styles.unpinBtn}>
              <Image
                style={styles.unpinnedIcon}
                source={require('./../../../assets/icons/unpinnedIcon.png')}
              />
            </AppButton>
          )}
          <AppText style={styles.title} noOfLines={2}>
            {title}
          </AppText>
          <AppText style={styles.description} noOfLines={2}>
            {description}
          </AppText>
          <AppText style={styles.date}>{getDateFormat(publishedAt)}</AppText>
        </View>
      </Card>
    </Swipeable>
  );
};

export default HeadlinesItem;
