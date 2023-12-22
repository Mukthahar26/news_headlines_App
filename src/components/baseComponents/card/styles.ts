import {scale, ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    minHeight: scale(50),
    backgroundColor: '#ffffff',
    borderRadius: scale(10),
    elevation: scale(6),
  },
});

export default styles;
