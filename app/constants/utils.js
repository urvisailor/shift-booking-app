import { PixelRatio, Platform } from "react-native";

export const fontScale = PixelRatio.getFontScale();
export const getFontSize = size => size / fontScale;

export const isIOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'