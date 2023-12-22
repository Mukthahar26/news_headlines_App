import moment from 'moment';
import {Alert} from 'react-native';
import Toast from 'react-native-simple-toast';
import logger from './logger';
import {useCallback} from 'react';

export const toastMessage = (text: string) =>
  Toast.showWithGravity(text, Toast.LONG, Toast.BOTTOM);

export const isArray = (arr: any) => Array.isArray(arr);

export const isFieldEmpty = (text: string | undefined) =>
  text && text.trim() ? text : false;

export const debounce = (callback: (data?: any) => void, delay: number) => {
  let timerId: any;
  const start = (...args: any) => {
    clearTimeout(timerId);
    logger.log('aaaaaa :', timerId);
    timerId = setTimeout(() => callback(args), delay);
  };

  const clear = () => clearTimeout(timerId);

  return {start, clear};
};

export const getDateFormat = (
  date: string,
  format: string = 'DD-MM-YYYY MM:HH',
) => moment(date).format(format);

type Props = {
  title?: string;
  message: string;
  onPressYes: () => void;
  onPressNo?: () => void;
};
export const confirmAlert = ({
  title = 'Alert!',
  message,
  onPressYes,
  onPressNo = () => {},
}: Props) => {
  Alert.alert(title, message, [
    {
      text: 'NO',
      onPress: onPressNo,
    },
    {
      text: 'YES',
      onPress: onPressYes,
    },
  ]);
};
