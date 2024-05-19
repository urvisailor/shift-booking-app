import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../styles';
import { COLORS } from '../../../constants/colors';

interface Shift {
  area: string;
  totalShifts: number;
}

interface HeaderProps {
  shifts: Shift[] | null;
  onTap: (shift: Shift) => void;
  currentIndex: number;
  setcurrentIndex: (index: number) => void;
}

const Header: React.FC<HeaderProps> = ({ shifts, onTap, currentIndex, setcurrentIndex }) => {

  useEffect(() => {
    if (shifts) {
      onTap(shifts[0]);
    }
  }, [shifts]);

  const onTapChange = (index: number, item: Shift) => {
    setcurrentIndex(index);
    onTap(item);
  };

  return (
    <View style={[styles.row, styles.headerBg]}>
      {shifts?.map((item: Shift, index: number) => (
        <TouchableOpacity key={index} onPress={() => onTapChange(index, item)}>
          <Text style={[styles.headerText, { color: currentIndex === index ? COLORS.BLUE : COLORS.LINK_WATER }]}>
            {item.area} ({item.totalShifts})
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Header;
