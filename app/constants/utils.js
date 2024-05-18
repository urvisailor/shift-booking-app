import { PixelRatio, Platform } from "react-native";
import { DateTime } from 'luxon';
export const fontScale = PixelRatio.getFontScale();
export const getFontSize = size => size / fontScale;

export const isIOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

export const isToday = (date) => {
    const now = DateTime.local();
    return now.hasSame(date, 'day');
};

export const isTomorrow = (date) => {
    const now = DateTime.local();
  const tomorrow = now.plus({ days: 1 });
  return tomorrow.hasSame(date, 'day');
};