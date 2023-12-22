import {StyleSheet} from 'react-native';
import {colorThemes} from './themes/colors';
import {scale} from 'react-native-size-matters';

const globalStyles = StyleSheet.create({
  offlineLabel: {
    backgroundColor: colorThemes.lightGray,
    alignSelf: 'center',
    position: 'absolute',
    color: colorThemes.black1,
    zIndex: 9,
    padding: 10,
    paddingRight: scale(20),
    paddingLeft: scale(20),
    borderBottomRightRadius: scale(8),
    borderBottomLeftRadius: scale(8),
  },
});

export default globalStyles;
