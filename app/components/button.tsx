import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import {getFontSize} from '../constants/utils';
import {WithLocalSvg} from 'react-native-svg/css';
import {greenLoader, redLoader} from '../constants/svgs';

interface ButtonProps {
  disable?: boolean; // Optional boolean for disabled state
  onClick: () => void | undefined; // Function to be called on press
  title: string; // Button title text
  isCancelable?: boolean; // Optional boolean for cancelable state
  isLoading?: boolean; // Optional boolean for loading state
}

const Button: React.FC<ButtonProps> = ({
  disable,
  onClick,
  title,
  isCancelable,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      testID="button"
      onPress={disable ? undefined : onClick}
      style={[
        disable
          ? styles.disableButton
          : isCancelable
          ? styles.cancelButton
          : styles.bookButton,
        styles.button,
      ]}>
      {isLoading ? (
        <WithLocalSvg
          asset={isCancelable ? redLoader : greenLoader}
          width={10}
          height={10}
        />
      ) : (
        <Text
          style={[
            disable
              ? styles.disableTxt
              : isCancelable
              ? styles.cancelTxt
              : styles.bookTxt,
            styles.btnTxt,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  disableButton: {
    borderColor: COLORS.LINK_WATER,
  },
  cancelButton: {
    borderColor: COLORS.DARK_PINK,
  },
  bookButton: {
    borderColor: COLORS.DARK_GREEN,
  },
  btnTxt: {
    fontSize: getFontSize(12),
    fontWeight: '500',
  },
  disableTxt: {
    color: COLORS.LINK_WATER,
  },
  cancelTxt: {
    color: COLORS.DARK_PINK,
  },
  bookTxt: {
    color: COLORS.DARK_GREEN,
  },
});

export default Button;
