import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

export default StyleSheet.create({
  thumbnail: {
    height: scale(140),
    resizeMode: 'stretch',
    borderRadius: scale(8),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
  },
  imageIcon: {
    marginTop: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    zIndex: 1,
  },
});
